const { fireEvent, getByText } = require('@testing-library/dom');
require('@testing-library/jest-dom');

document.body.innerHTML = `
  <div class="drawer">
    <button id="videosBtn">VÍDEOS</button>
    <button id="favoritesBtn">FAVORITOS</button>
  </div>
  <div class="content" id="content"></div>
`;

require('../drawer.js');

test('clicking VÍDEOS button updates content', async () => {
  const videosBtn = document.getElementById('videosBtn');

  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve('<h1>VÍDEOS</h1>'),
    })
  );

  await fireEvent.click(videosBtn);

  await new Promise(resolve => setTimeout(resolve, 100));

  const content = document.getElementById('content');
  expect(content.innerHTML).toBe('<h1>VÍDEOS</h1>');
});

test('clicking FAVORITOS button updates content', () => {
  const favoritesBtn = document.getElementById('favoritesBtn');
  fireEvent.click(favoritesBtn);
  const content = document.getElementById('content');
  expect(content.innerHTML).toBe('<h1>FAVORITOS</h1>');
});