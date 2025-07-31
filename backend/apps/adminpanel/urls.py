
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.UsersView import UserViewSet
from .views.UpdatesView import UpdateViewSet
from .views.MetricsView import MetricViewSet
from .views.BlogMonitoringView import BlogMonitoringViewSet
from .views.StaffMonitoringView import StaffMonitoringViewSet
from .views.VisitorStatView import VisitorStatViewSet
from .views.TrafficSourceView import TrafficSourceViewSet
from .views.CodeEditView import CodeEditView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'updates', UpdateViewSet, basename='updates')
router.register(r'metrics', MetricViewSet, basename='metrics')
router.register(r'blog-monitoring', BlogMonitoringViewSet, basename='blog-monitoring')
router.register(r'staff-monitoring', StaffMonitoringViewSet, basename='staff-monitoring')
router.register(r'visitor-stats', VisitorStatViewSet, basename='visitor-stats')
router.register(r'traffic-source', TrafficSourceViewSet, basename='traffic-source')

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('edit-code/', CodeEditView.as_view()),
    path('', include(router.urls)),
]
