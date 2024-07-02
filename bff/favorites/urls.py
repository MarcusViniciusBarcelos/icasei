from django.urls import path  # type: ignore

from .views import FavoriteDetail, FavoriteListCreate

urlpatterns = [
    path('favorites/', FavoriteListCreate.as_view(), name='favorite-list-create'),
    path('favorites/<str:video_id>/', FavoriteDetail.as_view(), name='favorite-detail'),
]