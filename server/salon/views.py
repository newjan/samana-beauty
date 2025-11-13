import logging
import copy
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


class AppointmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """ViewSet for viewing and creating Appointment instances"""
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        """Override create to set status to pending by default"""
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(status='pending')
            headers = self.get_success_headers(serializer.data)
            logger.info(f"Appointment created successfully: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            logger.error(f"Error creating appointment: {e}", exc_info=True)
            raise


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


