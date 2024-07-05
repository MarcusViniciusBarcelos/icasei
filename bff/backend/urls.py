from django.contrib import admin  # type:ignore
from django.urls import include, path  # type:ignore
from drf_yasg import openapi  # type:ignore
from drf_yasg.views import get_schema_view  # type:ignore
from rest_framework import permissions  # type:ignore

schema_view = get_schema_view(
    openapi.Info(
        title="iCasei API",
        default_version='v1',
        description="API documentation for iCasei project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@icasei.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('favorites.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
