const express = require('express');
const app = express();
const { Client } = require('pg');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

const client = new Client({
  user: 'generic',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432
});

client.connect();

// Read
app.get('/recipes', async (req, res) => {
  const { rows } = await client.query('SELECT name FROM recipes;');
  res.send(rows[0]);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
