from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        # Set the password using set_password to ensure proper hashing
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"message": "Successfully Registered. Login to access the App!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "User Already exists"}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if email is None or password is None:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the user from the database based on the email
        user = get_user_model().objects.filter(email=email).first()

        if user is not None and check_password(password, user.password):
            # Password matches, generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful!'
            }, status=status.HTTP_200_OK)
        else:
            # User with the specified email doesn't exist or password doesn't match
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
