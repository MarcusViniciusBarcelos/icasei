const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'src/css')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = req.query.maxResults || 20;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=${maxResults}&key=${apiKey}`;


  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`mf_videos listening at http://localhost:${port}`);
});