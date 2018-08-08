const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

const { Client } = require('pg');

const client = new Client({
  user: 'generic',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432
});

client.connect();

client.query('SELECT * FROM recipes', (err, res) => {
  console.log(err, res.rows[0].name);
  client.end();
});

app.get('/recipes', (req, res) => {
  console.log('hi');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
