from django.db import models  # type:ignore


class Favorite(models.Model):
    video_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail_url = models.URLField()

    def __str__(self):
        return self.title
