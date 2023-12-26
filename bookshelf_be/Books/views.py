from rest_framework import generics, authentication
from .models import Book
from .serializers import BookSerializer
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication  # Import JWTAuthentication

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookViewSet(ViewSet):
    """
        A simple view set for CRUD Announcements
    """
    authentication_classes = [JWTAuthentication, ]  # Use JWTAuthentication for authentication
    permission_classes = [IsAuthenticated, ]

    def get_default_book(self, books):
        if not books:
            # Create default books
            default_books = [
                {'title': 'The Three Muskeeters', 'author': 'Alexandre Dumas', 'publication_year': 2000, 'genre': 'Action and Adventure'},
                {'title': 'Ninth House', 'author': 'Unknown', 'publication_year': 1960, 'genre': 'Fantasy'},
                # Add more default books as needed
            ]

            for book_data in default_books:
                Book.objects.create(**book_data)
            return

    def list(self, request):
        sort_by = request.query_params.get('sortby')
        queryset = Book.objects.all()
        print("queryset***", queryset)
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)

        # Retrieve the book if no book present in Database
        self.get_default_book(books)

        # Sort book by Publication Year
        if sort_by == 'publication_year':
            queryset = queryset.order_by('publication_year')
        #filter books by genre        
        genre = request.query_params.get('genre')
        if genre:
            queryset = queryset.filter(genre=genre)

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
