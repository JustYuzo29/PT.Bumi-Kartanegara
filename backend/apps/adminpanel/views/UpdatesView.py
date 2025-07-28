from rest_framework import viewsets
from ..models import Update
from ..serializers import UpdateSerializer

class UpdateViewSet(viewsets.ModelViewSet):
    queryset = Update.objects.all()
    serializer_class = UpdateSerializer
