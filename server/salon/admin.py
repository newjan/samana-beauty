from django.contrib import admin
from .models import Product, Appointment


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'in_stock', 'created_at']
    list_filter = ['category', 'in_stock', 'created_at']
    search_fields = ['name', 'description', 'category']
    list_editable = ['in_stock']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'customer_email', 'appointment_date', 'appointment_time', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'appointment_date', 'service_type']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    list_editable = ['status']
    date_hierarchy = 'appointment_date'

