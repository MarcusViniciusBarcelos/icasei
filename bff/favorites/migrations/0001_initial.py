# Generated by Django 5.0.6 on 2024-07-02 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_id', models.CharField(max_length=100, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('thumbnail_url', models.URLField()),
            ],
        ),
    ]
