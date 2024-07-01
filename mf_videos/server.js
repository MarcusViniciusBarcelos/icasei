const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello from mf_videos!');
});

app.listen(port, () => {
  console.log(`mf_videos listening at http://localhost:${port}`);
});