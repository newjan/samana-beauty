import logging
import copy
import threading
from rest_framework import viewsets, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Appointment, DashboardContent
from .serializers import ProductSerializer, AppointmentSerializer, DashboardContentSerializer

logger = logging.getLogger(__name__)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing and editing Product instances"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def in_stock(self, request):
        """Get only products that are in stock"""
        products = self.queryset.filter(in_stock=True)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured products, limited to 6"""
        featured_products = self.queryset.filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)


from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

class AppointmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ViewSet for viewing and creating Appointment instances"""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        """Override create to set status to pending by default"""
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            appointment = serializer.save(status='pending')
            headers = self.get_success_headers(serializer.data)
            logger.info(f"Appointment created successfully: {serializer.data}")

            # --- Send email notifications in a background thread ---
            email_thread = threading.Thread(target=self.send_appointment_emails, args=(appointment,))
            email_thread.start()

            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            logger.error(f"Error creating appointment: {e}", exc_info=True)
            raise

    def send_appointment_emails(self, appointment):
        """
        Sends confirmation email to customer and notification to admin.
        This method is designed to be run in a background thread.
        """
        try:
            # Common context
            formatted_time = appointment.appointment_time.strftime('%I:%M %p') if appointment.appointment_time else ''
            
            # Send email notification to the user
            try:
                subject = 'We Have Received Your Appointment Request'
                from_email = settings.DEFAULT_FROM_EMAIL
                to_email = [appointment.customer_email]

                customer_context = {
                    'customer_name': appointment.customer_name,
                    'service_type': appointment.service_type,
                    'appointment_date': appointment.appointment_date,
                    'appointment_time': formatted_time,
                }
                
                html_content = render_to_string('salon/appointment_received.html', customer_context)
                text_content = render_to_string('salon/appointment_received.txt', customer_context)

                msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                
                logger.info(f"Appointment request email sent to {appointment.customer_email} for appointment {appointment.id}")
            except Exception as e:
                logger.error(f"Failed to send appointment request email to {appointment.customer_email} for appointment {appointment.id}: {e}", exc_info=True)

            # Send email notification to admin
            try:
                admin_subject = f'New Appointment Request: {appointment.customer_name}'
                admin_from_email = settings.DEFAULT_FROM_EMAIL
                admin_recipient_list = settings.ADMIN_EMAILS

                admin_context = {
                    'appointment': appointment,
                    'appointment_time': formatted_time,
                }

                admin_html_content = render_to_string('salon/admin_appointment_notification.html', admin_context)
                admin_text_content = f"""
                A new appointment has been booked.

                Details:
                Name: {appointment.customer_name}
                Email: {appointment.customer_email}
                Phone: {appointment.customer_phone}
                Service: {appointment.service_type}
                Date: {appointment.appointment_date}
                Time: {formatted_time}
                Notes: {appointment.notes}
                """

                admin_msg = EmailMultiAlternatives(admin_subject, admin_text_content, admin_from_email, admin_recipient_list)
                admin_msg.attach_alternative(admin_html_content, "text/html")
                admin_msg.send()

                logger.info(f"Admin notification email sent for appointment {appointment.id}")
            except Exception as e:
                logger.error(f"Failed to send admin notification email for appointment {appointment.id}: {e}", exc_info=True)
        
        except Exception as e:
            logger.error(f"An error occurred in the email sending thread for appointment {appointment.id}: {e}", exc_info=True)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthCheckView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        logger.info("Health check performed.")
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
    
from .models import Banner, Service
from .serializers import BannerSerializer, ServiceSerializer


class BannerListAPIView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True).order_by("priority")
    serializer_class = BannerSerializer

    def get(self, request, *args, **kwargs):
        try:
            response = super().get(request, *args, **kwargs)
            logger.info("Banner list retrieved successfully.")
            return response
        except Exception as e:
            logger.error(f"Error retrieving banner list: {e}", exc_info=True)
            raise


class ServiceListAPIView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True).select_related("category").order_by("title")
    serializer_class = ServiceSerializer

    def get(self, request, *args, **kwargs):
        try:
            response = super().get(request, *args, **kwargs)
            logger.info("Service list retrieved successfully.")
            return response
        except Exception as e:
            logger.error(f"Error retrieving service list: {e}", exc_info=True)
            raise


class DashboardContentDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    queryset = DashboardContent.objects.prefetch_related('images').all()
    serializer_class = DashboardContentSerializer

    def get(self, request, *args, **kwargs):
        try:
            response = super().get(request, *args, **kwargs)
            logger.info(f"Dashboard content detail for slug '{kwargs.get('slug')}' retrieved successfully.")
            return response
        except Exception as e:
            logger.error(f"Error retrieving dashboard content detail for slug '{kwargs.get('slug')}': {e}", exc_info=True)
            raise


class DashboardContentView(generics.GenericAPIView):
    queryset = DashboardContent.objects.prefetch_related('images').all()
    serializer_class = DashboardContentSerializer

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            
            response_data = {}
            for content in queryset:
                images = {img.key: img.file.url for img in content.images.all() if hasattr(img.file, 'url')}
                
                processed_data = copy.deepcopy(content.data)

                def process_data(data, images):
                    if isinstance(data, dict):
                        if data.get('icon_type') == 'image' and data.get('image_key'):
                            data['image'] = images.get(data['image_key'])

                        for key in data:
                            data[key] = process_data(data[key], images)
                    elif isinstance(data, list):
                        for i, item in enumerate(data):
                            data[i] = process_data(item, images)
                    return data
                
                final_data = process_data(processed_data, images)
                response_data[content.slug] = final_data
            logger.info("Dashboard content retrieved successfully.")
            return Response(response_data)
        except Exception as e:
            logger.error(f"Error retrieving dashboard content: {e}", exc_info=True)
            raise


