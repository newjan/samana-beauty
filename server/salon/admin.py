from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin
from django.contrib import admin
from django.db.models import JSONField
from django_json_widget.widgets import JSONEditorWidget
from .models import DashboardContent, DashboardImage, Product, Appointment, Banner, ServiceCategory, Service
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.models import User, Group

from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.admin import ModelAdmin


admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    # Forms loaded from `unfold.forms`
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass
@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ['name', 'category', 'price', 'in_stock', 'is_featured', 'created_at', 'image_preview']
    list_filter = ['category', 'in_stock', 'is_featured', 'created_at']
    search_fields = ['name', 'description', 'category']
    list_editable = ['in_stock', 'is_featured']
    # readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50" height="50" />')
        return "(No image)"
    image_preview.short_description = "Image Preview"

@admin.register(Appointment)
class AppointmentAdmin(ModelAdmin):
    list_display = ['customer_name', 'customer_email', 'appointment_date', 'appointment_time', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'appointment_date', 'service_type']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    list_editable = ['status']
    date_hierarchy = 'appointment_date'


@admin.register(Banner)
class BannerAdmin(ModelAdmin):
    list_display = ("title", "subtitle", "priority", "is_active", "created_at")
    list_filter = ("is_active",)


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ("title", "category", "price", "is_active")
    list_filter = ("is_active", "category")
    prepopulated_fields = {"slug": ("title",)}
    
    
@admin.register(DashboardContent)
class DashboardContentAdmin(ModelAdmin):
    list_display = ("slug", "created_at", "updated_at")
    readonly_fields = ("slug", "created_at", "updated_at")
    formfield_overrides = {
        JSONField: {'widget': JSONEditorWidget},
    }


@admin.register(DashboardImage)
class DashboardImageAdmin(ModelAdmin):
    list_display = ("content", "key", "alt_text")
    list_filter = ("content",)
    search_fields = ("key", "alt_text")
    readonly_fields = ("file_preview",)

    def file_preview(self, obj):
        if obj.file:
            return obj.file.url
        return None
    file_preview.short_description = "File Preview"
    file_preview.allow_tags = True
