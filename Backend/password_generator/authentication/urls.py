from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserSignupView, CustomTokenObtainPairView, SavedPasswordDetailView, SavedPasswordListCreateView


urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('passwords/', SavedPasswordView.as_view(), name='saved_passwords'),
    path('saved_passwords/', SavedPasswordListCreateView.as_view(), name='saved_password_list_create'),
    path('saved_passwords/<int:pk>/', SavedPasswordDetailView.as_view(), name='saved_password_detail'),
]