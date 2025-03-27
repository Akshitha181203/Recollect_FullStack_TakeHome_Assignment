from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from .models import Loan
from .serializers import LoanSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all().order_by("-created_at")
    serializer_class = LoanSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'region', 'status']  
    search_fields = ['id', 'borrower', 'coName']    
    ordering_fields = ['amount', 'dpd', 'created_at']

    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        ids = request.data.get("ids", [])
        if not ids:
            return Response({"error": "No IDs provided"}, status=400)
        Loan.objects.filter(id__in=ids).delete()
        return Response({"deleted": ids}, status=200)
