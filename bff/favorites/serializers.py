from rest_framework import serializers  # type:ignore

from .models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['video_id', 'title', 'description', 'thumbnail_url']