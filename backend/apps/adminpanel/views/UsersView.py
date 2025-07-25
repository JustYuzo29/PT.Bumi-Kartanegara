from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import User
from ..serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Bisa diganti dengan IsAuthenticated kalau sudah ada auth
