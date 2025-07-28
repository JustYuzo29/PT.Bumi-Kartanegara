from rest_framework import viewsets
from ..models import Metric
from ..serializers import MetricSerializer

class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer
