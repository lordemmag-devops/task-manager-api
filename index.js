require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});