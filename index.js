require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 5000;
const connectDB = require('./src/config/db');

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});