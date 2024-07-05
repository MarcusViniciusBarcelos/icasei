console.log('Favoritos.js loaded');  // Log para verificar se o script está sendo carregado

(async () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch('http://localhost:8000/api/favorites/list/');
        console.log('Fetching favorites...');  // Debugging log
        const data = await response.json();
        console.log('Favorites data:', data);  // Debugging log

        if (data.length > 0) {
            data.forEach(item => {
                const videoDiv = document.createElement('div');
                videoDiv.className = 'video';
                videoDiv.innerHTML = `
                    <img src="${item.thumbnail_url}" alt="${item.title}">
                    <div class="overlay">
                        <span class="title">${item.title}</span>
                        <button class="favoriteBtn fas" data-video-id="${item.video_id}">
                            ⭐
                        </button>
                    </div>
                `;
                resultsDiv.appendChild(videoDiv);
                
                // Log HTML gerado
                console.log(`Generated HTML for video ID ${item.video_id}:`, videoDiv.innerHTML);
            });

            document.querySelectorAll('.favoriteBtn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const btn = event.currentTarget;
                    const videoId = btn.getAttribute('data-video-id');
                    console.log('Removing favorite video ID:', videoId);  // Debugging log

                    try {
                        const response = await fetch(`http://localhost:8000/api/favorites/remove/${videoId}/`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            btn.closest('.video').remove();
                            console.log('Video removed from favorites');  // Debugging log
                        } else {
                            console.error('Failed to remove favorite:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Error removing favorite:', error);
                    }
                });

                // Log para verificar se a classe está sendo aplicada corretamente
                console.log(`Button class list: ${button.classList}`);
            });
        } else {
            resultsDiv.innerHTML = '<p>No favorites found.</p>';
        }
    } catch (error) {
        console.error('Error fetching favorite videos:', error);
        resultsDiv.innerHTML = '<p>Error fetching favorite videos. Please try again later.</p>';
    }
})();
