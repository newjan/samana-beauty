from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BannerListAPIView, ProductViewSet, AppointmentViewSet, HealthCheckView, ServiceListAPIView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'appointments', AppointmentViewSet, basename='appointment')


urlpatterns = [
    path('api/', include(router.urls)),
    path('health/', HealthCheckView.as_view(), name='healthcheck'),
    path("api/banners/", BannerListAPIView.as_view(), name="banner-list"),
    path("api/services/", ServiceListAPIView.as_view(), name="service-list"),
]

