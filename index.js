// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  user: 'generic',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432
});

var start = new Date();

async function connect() {
  await client.connect();
  var end = new Date();
  var elapsed = end - start;
  console.log(`Connected to Client ${elapsed} ms after beginning`);
}

connect();

app.get('/recipes', async (req, res) => {
  if (req.method == 'GET') {
    const column = req.query.recipes;
    const { rows } = await client.query(`SELECT ${column} FROM recipes;`);
    console.log('Rows:', rows);
    res.send(rows);
  }
});

app.post('/', async (req, res) => {
  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  await client.query(
    `INSERT INTO recipes (name, ingredients, directions) VALUES ('${name}', '${ingredients}', '${directions}');`
  );
  await res.redirect('/');
});

app.delete('/recipes', async (req, res) => {
  console.log('DELETE Request Received');
  const column = req.query.recipes;
  column
    ? await client.query(`DELETE FROM recipes WHERE name = '${column}';`)
    : console.log('No column was received');

  res.send(`${column} was deleted.`);
});

app.put('/recipes', async (req, res) => {
  console.log('PUT request received');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
