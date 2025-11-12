from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BannerListAPIView, DashboardContentView, ProductViewSet, AppointmentViewSet, HealthCheckView, ServiceListAPIView, DashboardContentDetail

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'appointments', AppointmentViewSet, basename='appointment')


urlpatterns = [
    path('api/', include(router.urls)),
    path('health/', HealthCheckView.as_view(), name='healthcheck'),
    path("api/banners/", BannerListAPIView.as_view(), name="banner-list"),
    path("api/services/", ServiceListAPIView.as_view(), name="service-list"),
    path("api/dashboard-content/all/", DashboardContentView.as_view(), name="dashboard-content-detail"),
    path("api/dashboard-content/<slug:slug>/", DashboardContentDetail.as_view(), name="dashboard-content-detail"),
]

