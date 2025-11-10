from rest_framework import serializers
from .models import Product, Appointment


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product model"""
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url', 'category', 'in_stock', 'created_at', 'updated_at']
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

