import os

import requests  # type:ignore
from rest_framework import status  # type:ignore
from rest_framework import viewsets  # type:ignore
from rest_framework.decorators import action, api_view  # type:ignore
from rest_framework.response import Response  # type:ignore

from .models import Favorite
from .serializers import FavoriteSerializer

YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    lookup_field = 'video_id'

    @action(detail=False, methods=['post'], url_path='add', url_name='add')
    def add(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='remove', url_name='remove')
    def remove(self, request, video_id=None):
        favorite = self.get_object()
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# View for searching videos
@api_view(['GET'])
def search_videos(request):
    query = request.GET.get('q')
    url = f'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q={query}&maxResults=20&key={YOUTUBE_API_KEY}'
    response = requests.get(url)
    data = response.json()
    
    # Transformar os dados para incluir informações de favoritos
    items = data.get('items', [])
    for item in items:
        video_id = item['id']['videoId']
        favorite = Favorite.objects.filter(video_id=video_id).first()
        item['is_favorite'] = favorite is not None
        
    return Response(data)
