from django.test import TestCase  # type:ignore
from django.urls import reverse  # type:ignore
from rest_framework import status  # type:ignore
from rest_framework.test import APIClient  # type:ignore

from .models import Favorite


class FavoriteTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.favorite_data = {
            'video_id': '12345',
            'title': 'Test Video',
            'description': 'Test Description',
            'thumbnail_url': 'http://example.com/thumb.jpg'
        }
        self.favorite = Favorite.objects.create(**self.favorite_data)

    def test_create_favorite(self):
        new_favorite_data = {
            'video_id': '67890',
            'title': 'New Test Video',
            'description': 'New Test Description',
            'thumbnail_url': 'http://example.com/new_thumb.jpg'
        }
        response = self.client.post(
            reverse('favorites-add'),
            new_favorite_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Favorite.objects.count(), 2)
        self.assertEqual(response.data['title'], new_favorite_data['title'])

    def test_get_all_favorites(self):
        response = self.client.get(reverse('favorites-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.favorite_data['title'])

    def test_delete_favorite(self):
        response = self.client.delete(
            reverse('favorites-remove', kwargs={'video_id': self.favorite.video_id}),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Favorite.objects.count(), 0)

    def test_search_videos(self):
        query = 'test'
        response = self.client.get(reverse('search-videos'), {'q': query})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('items', response.data)
        for item in response.data['items']:
            self.assertIn('is_favorite', item)