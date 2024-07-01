document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:3001/search?q=${query}&maxResults=20`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const videoDiv = document.createElement('div');
                videoDiv.className = 'video';
                videoDiv.innerHTML = `
                    <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
                    <div class="overlay">
                        <span class="title">${item.snippet.title}</span>
                        <button class="favoriteBtn"><i class="far fa-star"></i></button>
                    </div>
                `;
                resultsDiv.appendChild(videoDiv);
            });

            document.querySelectorAll('.favoriteBtn').forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('filled');
                    const icon = button.querySelector('i');
                    if (button.classList.contains('filled')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
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