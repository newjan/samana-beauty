from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
import cloudinary

from .models import Banner, Service, DashboardImage


@receiver(pre_save, sender=Banner)
def banner_pre_save(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_file = sender.objects.get(pk=instance.pk).image
    except sender.DoesNotExist:
        return

    if old_file and old_file != instance.image:
        cloudinary.uploader.destroy(old_file.name)


@receiver(post_delete, sender=Banner)
def banner_post_delete(sender, instance, **kwargs):
    if instance.image:
        cloudinary.uploader.destroy(instance.image.name)


@receiver(pre_save, sender=Service)
def service_pre_save(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_file = sender.objects.get(pk=instance.pk).image
    except sender.DoesNotExist:
        return

    if old_file and old_file != instance.image:
        cloudinary.uploader.destroy(old_file.name)


@receiver(post_delete, sender=Service)
def service_post_delete(sender, instance, **kwargs):
    if instance.image:
        cloudinary.uploader.destroy(instance.image.name)


@receiver(pre_save, sender=DashboardImage)
def dashboard_image_pre_save(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_file = sender.objects.get(pk=instance.pk).file
    except sender.DoesNotExist:
        return

    if old_file and old_file != instance.file:
        cloudinary.uploader.destroy(old_file.name)


@receiver(post_delete, sender=DashboardImage)
def dashboard_image_post_delete(sender, instance, **kwargs):
    if instance.file:
        cloudinary.uploader.destroy(instance.file.name)
