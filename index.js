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

var start = new Date();

async function connect() {
  await client.connect();
  var end = new Date();
  var elapsed = end - start;
  console.log(`Connected to Client ${elapsed} ms after beginning`);
}

connect();

// Can use something like for most displays; display just names, etc.
// This logic will work with pagination of recipes and the like
// Have to use interpolation with pg params not functioning correctly

app.get('/recipes', async (req, res) => {
  if (req.method == 'GET') {
    console.log('Got a GET');
    console.log(req.originalUrl);
    const values = req.query.recipes;
    console.log(values);
    const { rows } = await client.query(`SELECT ${values} FROM recipes;`);
    console.log('Rows:', rows);
    res.send(rows);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
