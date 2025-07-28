from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import os
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

SAFE_FILES = {
    'admin': os.path.join(settings.BASE_DIR, 'apps', 'adminpanel', 'models.py'),
    'staff': os.path.join(settings.BASE_DIR, 'apps', 'adminpanel', 'views', 'StaffMonitoringView.py'),
    'blog': os.path.join(settings.BASE_DIR, 'apps', 'adminpanel', 'views', 'BlogMonitoringView.py'),
}

class CodeEditView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        file_key = request.query_params.get('file')
        file_path = SAFE_FILES.get(file_key)
        if not file_path or not os.path.isfile(file_path):
            return Response({'error': 'File tidak ditemukan atau tidak diizinkan.'}, status=status.HTTP_403_FORBIDDEN)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return Response({'content': content})

    def post(self, request):
        file_key = request.data.get('file')
        file_path = SAFE_FILES.get(file_key)
        if not file_path or not os.path.isfile(file_path):
            return Response({'error': 'File tidak ditemukan atau tidak diizinkan.'}, status=status.HTTP_403_FORBIDDEN)
        new_content = request.data.get('content', '')
        if not isinstance(new_content, str):
            return Response({'error': 'Konten tidak valid.'}, status=status.HTTP_400_BAD_REQUEST)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return Response({'status': 'success'})
