const { fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      items: [
        {
          id: { videoId: '123' },
          snippet: {
            title: 'Test Video',
            description: 'This is a test video',
            thumbnails: {
              default: { url: 'http://test.com/thumb.jpg' }
            }
          }
        }
      ]
    })
  })
);

document.body.innerHTML = `
  <div class="container">
    <div class="search">
      <input type="text" id="searchInput" placeholder="Search for videos">
      <button id="searchBtn"><i class="fas fa-search"></i></button>
    </div>
    <div id="results"></div>
  </div>
`;

require('../videos.js');

test('searching for videos updates results', async () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  fireEvent.change(searchInput, { target: { value: 'test' } });
  fireEvent.click(searchBtn);

  // Aguardar a atualização do DOM
  await new Promise(resolve => setTimeout(resolve, 100));

  const results = document.getElementById('results');
  expect(results.innerHTML).toContain('Test Video');
  expect(results.innerHTML).toContain('http://test.com/thumb.jpg');
});

test('handles no results found', async () => {
  // Mock fetch response for no results
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({
      items: []
    })
  });

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  fireEvent.change(searchInput, { target: { value: 'noresults' } });
  fireEvent.click(searchBtn);

  // Aguardar a atualização do DOM
  await new Promise(resolve => setTimeout(resolve, 100));

  const results = document.getElementById('results');
  expect(results.innerHTML).toContain('No results found.');
});

test('handles fetch error', async () => {
  // Mock fetch to reject with an error
  global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  fireEvent.change(searchInput, { target: { value: 'error' } });
  fireEvent.click(searchBtn);

  // Aguardar a atualização do DOM
  await new Promise(resolve => setTimeout(resolve, 100));

  const results = document.getElementById('results');
  expect(results.innerHTML).toContain('Error fetching videos. Please try again later.');
});
