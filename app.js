const express = require('express');
const app = express();
const PORT = 8000;

const createDbConnection = require('./models/db');

const shuiRouter = require('./routes/shui');

app.use(express.json());
app.use('/api/shui', shuiRouter);


app.listen(PORT, () => {
  createDbConnection();
  console.log(`Server started on port ${PORT}`)
});