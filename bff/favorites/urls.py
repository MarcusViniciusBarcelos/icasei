from django.urls import path  # type:ignore

from .views import FavoriteViewSet, search_videos

urlpatterns = [
    path('favorites/list/', FavoriteViewSet.as_view({'get': 'list'}), name='favorites-list'),
    path('favorites/add/', FavoriteViewSet.as_view({'post': 'add'}), name='favorites-add'),
    path('favorites/remove/<str:video_id>/', FavoriteViewSet.as_view({'delete': 'remove'}), name='favorites-remove'),
    path('search/', search_videos, name='search-videos'),
]