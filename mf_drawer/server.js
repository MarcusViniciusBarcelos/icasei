const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'src/css')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));

// Rota para servir a pagina de videos do MF_VIDEOS
app.get('/mf_videos', async (req, res) => {
  try {
    const response = await axios.get('http://mf_videos:3001');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching MF_VIDEOS content');
  }
});

// Rota para servir a página de favoritos do MF_VIDEOS
app.get('/favoritos', async (req, res) => {
  try {
    const response = await axios.get('http://mf_videos:3001/favoritos.html');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching FAVORITOS content');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`mf_drawer listening at http://localhost:${port}`);
});