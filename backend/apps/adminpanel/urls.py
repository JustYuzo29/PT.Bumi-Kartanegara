from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.UsersView import UserViewSet
from .views.UpdatesView import UpdateViewSet
from .views.MetricsView import MetricViewSet
from .views.BlogMonitoringView import BlogMonitoringViewSet
from .views.StaffMonitoringView import StaffMonitoringViewSet
from .views.VisitorStatView import VisitorStatViewSet
from .views.TrafficSourceView import TrafficSourceViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'updates', UpdateViewSet, basename='updates')
router.register(r'metrics', MetricViewSet, basename='metrics')
router.register(r'blog-monitoring', BlogMonitoringViewSet, basename='blog-monitoring')
router.register(r'staff-monitoring', StaffMonitoringViewSet, basename='staff-monitoring')
router.register(r'visitor-stats', VisitorStatViewSet, basename='visitor-stats')
router.register(r'traffic-source', TrafficSourceViewSet, basename='traffic-source')

urlpatterns = [
    path('', include(router.urls)),
]
