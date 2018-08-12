// Imports
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
  const { rows } = await client.query(
    'SELECT name, ingredients, directions FROM recipes;'
  );
  res.send(rows);
});

// FIXME: Need a way to append information to INSERT statement
// Create
app.post('/addrecipe', async (req, res) => {
  await client.query(
    "INSERT INTO recipes (name, ingredients, directions) VALUES ('Peanut Butter and Jelly', 'Bread, Peanut Butter, and Jelly', 'Apply to both sides, put them together, enjoy');"
  );
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
