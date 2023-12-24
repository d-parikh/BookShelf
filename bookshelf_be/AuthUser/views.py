# myapp/views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class RegisterUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        print("request***", request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Successfully Registered. Login to access the App!"}, status=status.HTTP_201_CREATED)
        else:
            print("request***222", request.data)
            return Response({"error": "User Already exists"}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        print("email***", email)
        print("password***", password)

        if email is None or password is None:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_user_model().objects.filter(email=email).first()
        print("user***", user)

        # if user is None or not user.check_password(password):
        #     return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'message': 'Login successful!'}, status=status.HTTP_200_OK)


