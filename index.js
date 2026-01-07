require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 5000;
const pool = require('./src/config/db');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});