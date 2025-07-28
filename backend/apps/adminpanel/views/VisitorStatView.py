from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import VisitorStat
from ..serializers import VisitorStatSerializer

class VisitorStatViewSet(viewsets.ModelViewSet):
    queryset = VisitorStat.objects.all()
    serializer_class = VisitorStatSerializer

    def get_queryset(self):
        start = self.request.query_params.get('start')
        end = self.request.query_params.get('end')
        qs = super().get_queryset()
        if start and end:
            qs = qs.filter(date__gte=start, date__lte=end)
        return qs
