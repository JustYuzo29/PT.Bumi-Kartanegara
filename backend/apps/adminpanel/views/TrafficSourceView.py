from rest_framework import viewsets
from ..models import TrafficSource
from ..serializers import TrafficSourceSerializer

class TrafficSourceViewSet(viewsets.ModelViewSet):
    queryset = TrafficSource.objects.all()
    serializer_class = TrafficSourceSerializer

    def get_queryset(self):
        start = self.request.query_params.get('start')
        end = self.request.query_params.get('end')
        qs = super().get_queryset()
        if start and end:
            qs = qs.filter(date__gte=start, date__lte=end)
        return qs
