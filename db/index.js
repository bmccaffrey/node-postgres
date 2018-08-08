const { Client } = require('pg');

const client = new Client({
  user: 'generic',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432
});

module.exports = {
  query: client.query('SELECT * FROM recipes', (err, res) => {
    console.log(err, res.rows[0].name);
    client.end();
  })
};
