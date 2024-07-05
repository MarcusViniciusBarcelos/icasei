document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:8000/api/search/?q=${query}`);
        const data = await response.json();
        console.log('Data fetched:', data);

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const isFavorite = item.is_favorite ? 'fas' : 'far';

                const videoDiv = document.createElement('div');
                videoDiv.className = 'video';
                videoDiv.innerHTML = `
                    <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
                    <div class="overlay">
                        <span class="title">${item.snippet.title}</span>
                        <button class="favoriteBtn ${isFavorite}" data-video-id="${videoId}" data-title="${item.snippet.title}" data-description="${item.snippet.description}" data-thumbnail-url="${item.snippet.thumbnails.default.url}">
                            <i class="${isFavorite} fa-star"></i>
                        </button>
                    </div>
                `;
                resultsDiv.appendChild(videoDiv);

                const favoriteBtn = videoDiv.querySelector('.favoriteBtn');
                favoriteBtn.addEventListener('click', async (e) => {
                    const button = e.currentTarget;
                    const videoId = button.getAttribute('data-video-id');
                    const title = button.getAttribute('data-title');
                    const description = button.getAttribute('data-description');
                    const thumbnailUrl = button.getAttribute('data-thumbnail-url');
                    const icon = button.querySelector('i');

                    const favoriteData = {
                        video_id: videoId,
                        title: title,
                        description: description,
                        thumbnail_url: thumbnailUrl
                    };

                    if (button.classList.contains('fas')) {
                        // remover dos favoritos
                        try {
                            const response = await fetch(`http://localhost:8000/api/favorites/remove/${videoId}/`, {
                                method: 'DELETE'
                            });

                            if (response.ok) {
                                console.log('Video removed from favorites');
                                button.classList.remove('fas');
                                button.classList.add('far');
                                icon.classList.remove('fas');
                                icon.classList.add('far');
                            } else {
                                console.error('Failed to remove video from favorites');
                            }
                        } catch (error) {
                            console.error('Error removing video from favorites:', error);
                        }
                    } else {
                        // adicionar aos favoritos
                        try {
                            const response = await fetch('http://localhost:8000/api/favorites/add/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(favoriteData)
                            });

                            if (response.ok) {
                                console.log('Video added to favorites');
                                button.classList.add('fas');
                                button.classList.remove('far');
                                icon.classList.add('fas');
                                icon.classList.remove('far');
                            } else {
                                console.error('Failed to add video to favorites');
                            }
                        } catch (error) {
                            console.error('Error adding video to favorites:', error);
                        }
                    }
                });
            });
        } else {
            resultsDiv.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        resultsDiv.innerHTML = '<p>Error fetching videos. Please try again later.</p>';
    }
});
