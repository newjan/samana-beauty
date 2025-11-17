from rest_framework import serializers
from .models import Product, Appointment, Banner, ServiceCategory, Service, DashboardContent, DashboardImage


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product model"""
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'category', 'in_stock', 'is_featured', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model"""
    class Meta:
        model = Appointment
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'appointment_date', 'appointment_time', 'service_type',
            'notes', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

    def validate_appointment_date(self, value):
        """Ensure appointment date is not in the past"""
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return value


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ["id", "title", "subtitle", "description", "image", "priority", "is_active", "created_at", "updated_at"]
        
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  # Cloudinary-hosted URL
        return None


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug", "description", "created_at", "updated_at"]


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    discount_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id", "title", "slug", "description", "price", "offer_price", 
            "discount_percentage", "duration_minutes", "image", "is_active", 
            "category", "created_at", "updated_at", "additional_info"
        ]

    def get_discount_percentage(self, obj):
        if obj.offer_price and obj.price and obj.offer_price < obj.price:
            discount = ((obj.price - obj.offer_price) / obj.price) * 100
            return round(discount)
        return None


class DashboardImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = DashboardImage
        fields = ["key", "url", "alt_text"]

    def get_url(self, obj):
        try:
            return obj.file.url
        except Exception:
            return None


class DashboardContentSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = DashboardContent
        fields = ["slug", "data", "images", "updated_at", "created_at"]
        read_only_fields = ["slug", "images", "updated_at", "created_at"]

    def get_images(self, obj: DashboardContent):
        # Return map { key: {url, alt_text} }
        out = {}
        for img in obj.images.all():
            out[img.key] = {
                "url": getattr(img.file, 'url', None),
                "alt_text": img.alt_text,
            }
        return out

