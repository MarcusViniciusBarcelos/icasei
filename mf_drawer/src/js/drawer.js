document.getElementById('videosBtn').addEventListener('click', async () => {
  console.log('Loading videos content');
  await loadContent('http://localhost:3001/videos.html');
  loadStyles('http://localhost:3001/css/styles.css');
  loadScript('http://localhost:3001/js/videos.js');
});

document.getElementById('favoritesBtn').addEventListener('click', async () => {
  console.log('Loading favorites content');
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<h1>FAVORITOS</h1><div id="results"></div>';
  loadStyles('http://localhost:3001/css/styles.css');
  loadScript('http://localhost:3001/js/favoritos.js');
});

async function loadContent(url) {
  const contentDiv = document.getElementById('content');
  try {
      console.log(`Fetching content from ${url}`);
      const response = await fetch(url);
      const text = await response.text();
      contentDiv.innerHTML = text;
  } catch (error) {
      contentDiv.innerHTML = '<p>Error loading content</p>';
      console.error('Error loading content:', error);
  }
}

function loadScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = () => {
      console.log(`Script loaded: ${url}`);
  };
  document.body.appendChild(script);
}

function loadStyles(url) {
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
      loadContent,
      loadStyles,
      loadScript,
  };
}
