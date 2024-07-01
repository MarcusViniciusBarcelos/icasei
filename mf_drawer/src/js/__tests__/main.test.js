const { fireEvent, getByText } = require('@testing-library/dom');

document.body.innerHTML = `
  <div class="container">
    <div class="drawer">
      <button id="videosBtn">VÍDEOS</button>
      <button id="favoritesBtn">
        FAVORITOS <span id="favoritesCount">0</span>
      </button>
    </div>
    <div class="content" id="content">
      <h1>Welcome to MF_DRAWER</h1>
    </div>
  </div>
`;

require('../main.js');

test('clicking VÍDEOS button updates content', () => {
  const videosBtn = document.getElementById('videosBtn');
  fireEvent.click(videosBtn);
  const content = document.getElementById('content');
  expect(content.innerHTML).toBe('<h1>VÍDEOS</h1>');
});

test('clicking FAVORITOS button updates content', () => {
  const favoritesBtn = document.getElementById('favoritesBtn');
  fireEvent.click(favoritesBtn);
  const content = document.getElementById('content');
  expect(content.innerHTML).toBe('<h1>FAVORITOS</h1>');
});