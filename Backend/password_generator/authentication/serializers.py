from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import SavedPassword

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'mobile', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class SavedPasswordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to include user details

    class Meta:
        model = SavedPassword
        fields = ['id', 'user', 'website', 'notes', 'password', 'date_created']