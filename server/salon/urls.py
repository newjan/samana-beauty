from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, AppointmentViewSet, HealthCheckView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('api/', include(router.urls)),
    path('health/', HealthCheckView.as_view(), name='healthcheck'),
]

