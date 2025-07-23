from django.urls import path, include
from django.http import JsonResponse

def root(request):
    return JsonResponse({"message": "API is running", "docs": "/api/"})

urlpatterns = [
    path("", root),              # <- optional
    path("api/", include("api.urls")),
]
