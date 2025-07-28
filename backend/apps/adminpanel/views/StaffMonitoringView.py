from rest_framework import viewsets
from ..models import StaffMonitoring
from ..serializers import StaffMonitoringSerializer

class StaffMonitoringViewSet(viewsets.ModelViewSet):
    queryset = StaffMonitoring.objects.all()
    serializer_class = StaffMonitoringSerializer
