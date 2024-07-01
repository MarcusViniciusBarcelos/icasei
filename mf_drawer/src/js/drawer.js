document.getElementById('videosBtn').addEventListener('click', async () => {
    await loadContent('http://localhost:3001');
    loadStyles('http://localhost:3001/css/styles.css');
    loadScript('http://localhost:3001/js/videos.js');
  });
  
  document.getElementById('favoritesBtn').addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h1>FAVORITOS</h1>';
  });
  
  async function loadContent(url) {
    const contentDiv = document.getElementById('content');
    try {
      const response = await fetch(url);
      const text = await response.text();
      contentDiv.innerHTML = text;
    } catch (error) {
      contentDiv.innerHTML = '<p>Error loading content</p>';
    }
  }
  
  function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
  
  function loadStyles(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  
  module.exports = {
    loadContent,
    loadStyles,
    loadScript,
  };
  