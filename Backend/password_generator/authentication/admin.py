from django.contrib import admin
from .models import User, SavedPassword

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "email",
        "is_superuser",
        "is_active",
        "mobile",
    ]


admin.site.register(User, UserAdmin)

class SavedAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        'website',
        'notes',
        'password',
        'date_created',
    ]

admin.site.register(SavedPassword, SavedAdmin)    
