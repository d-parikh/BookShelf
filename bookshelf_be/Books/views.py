from rest_framework import generics
from .models import Book
from .serializers import BookSerializer
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from django.shortcuts import get_object_or_404, render

class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        sort_by = self.request.query_params.get('sort', None)
        if sort_by == 'publication_year':
            queryset = queryset.order_by('publication_year')
        return queryset

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookViewSet(ViewSet):
    """
        A simple view set for CRUD Announcements
    """
    def list(self, request):
        sort_by = request.query_params.get('sortby')

        queryset = Book.objects.all()
        print("queryset***", queryset)

        if sort_by == 'publication_year':
            queryset = queryset.order_by('publication_year')

        serializer = BookSerializer(queryset, many=True)
        return Response({"data": serializer.data}, status=HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        queryset = Book.objects.filter(id=pk)
        serializer = BookSerializer(queryset, many=True)
        return Response({"data": serializer.data}, status=HTTP_200_OK)

    def create(self, request):
        if not request.data.get('publication_year').isdigit():
            return Response({"message": "Valid integer is required for publication Year"}, status=HTTP_400_BAD_REQUEST)
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message":"Book added successfully"}, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        queryset = Book.objects.all()
        book_obj = get_object_or_404(queryset, pk=pk)
        if not str(request.data.get('publication_year')).isdigit():
            return Response({"message": "Valid integer is required for publication Year"}, status=HTTP_400_BAD_REQUEST)
        serializer = BookSerializer(
            book_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "Book Details updated successfully"}, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        queryset = Book.objects.all()
        book = get_object_or_404(queryset, pk=pk)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=HTTP_204_NO_CONTENT)
