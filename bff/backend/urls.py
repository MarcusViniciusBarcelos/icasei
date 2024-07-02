from django.contrib import admin  # type: ignore
from django.urls import include, path  # type: ignore

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('favorites.urls')),
]
