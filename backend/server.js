const express = require('express');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello, Restaurant! The backend is running!');
});

app.listen(PORT, () => {
  console.log(`The server has successfully started at http://localhost:${PORT}.`);
});