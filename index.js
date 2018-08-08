const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
// app.get('/', (req, res) => { res.sendFile('/Users/bryanmccaffrey/react/pgnode/public/index.html')})
const { Client } = require('pg');

const client = new Client({
  user: 'generic',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432
});

client.connect();

var myLogger = function(req, res, next) {
  console.log('LOGGED');
  next();
};

var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.use(myLogger);

app.get('/recipes', async (req, res) => {
  const { rows } = await client.query('SELECT name FROM recipes;');
  res.send(rows[0]);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
