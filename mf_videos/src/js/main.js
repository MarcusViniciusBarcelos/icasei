document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const response = await fetch(`/search?q=${query}`);
    const data = await response.json();

    data.items.forEach(item => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'video';
        videoDiv.innerHTML = `
            <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
            <div class="details">
                <h3>${item.snippet.title}</h3>
                <p>${item.snippet.description}</p>
            </div>
        `;
        resultsDiv.appendChild(videoDiv);
    });
});