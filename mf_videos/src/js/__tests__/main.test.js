const { fireEvent, getByText, getByPlaceholderText } = require('@testing-library/dom');

document.body.innerHTML = `
  <div class="container">
    <input type="text" id="searchInput" placeholder="Search for videos">
    <button id="searchBtn">Search</button>
    <div id="results"></div>
  </div>
`;

require('../main.js');

beforeEach(() => {
  fetch.resetMocks();
});

test('searching for videos updates results', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: [
        {
          snippet: {
            title: 'Test Video',
            description: 'This is a test video description',
            thumbnails: {
              default: {
                url: 'http://test.com/thumb.jpg'
              }
            }
          }
        }
      ]
    }));

    const searchInput = getByPlaceholderText(document.body, 'Search for videos');
    const searchBtn = getByText(document.body, 'Search');
  
    fireEvent.input(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchBtn);
  
    // Wait for the fetch to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const results = document.getElementById('results');
    expect(results.innerHTML).toContain('Test Video');
    expect(results.innerHTML).toContain('This is a test video description');
    expect(results.innerHTML).toContain('http://test.com/thumb.jpg');
  }); 