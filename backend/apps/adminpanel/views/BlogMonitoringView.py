from rest_framework import viewsets
from ..models import BlogMonitoring
from ..serializers import BlogMonitoringSerializer

class BlogMonitoringViewSet(viewsets.ModelViewSet):
    queryset = BlogMonitoring.objects.all()
    serializer_class = BlogMonitoringSerializer
