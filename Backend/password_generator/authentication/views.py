from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, SavedPasswordSerializer
from .models import SavedPassword
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

User = get_user_model()

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token    
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = User.objects.filter(email=email).first()
            if user and user.check_password(password):
                token = self.get_token(user)
                return {
                    'refresh': str(token),
                    'access': str(token.access_token),
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'name': user.name,
                        'mobile': user.mobile
                    }
                }
            else:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError('Both email and password are required')   


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        response = {
            'refresh': data['refresh'],
            'access': data['access'],
            'user': data['user']
        }
        return Response(response, status=status.HTTP_200_OK)
    

class SavedPasswordListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedPasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedPassword.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavedPasswordDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SavedPasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedPassword.objects.filter(user=self.request.user)    