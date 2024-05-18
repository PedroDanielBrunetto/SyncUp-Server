require('dotenv').config();
const express = require('express');
const app = express();
const Ideas = require('./Services/Ideas.js');

// Middleware para processar dados do corpo da requisição
app.use(express.json());

const port = process.env.PORT || 3000;
const url = process.env.URL || 'http://localhost';

const pool = require("../Infra/Connection");

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
  connection.release();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/register', Ideas);

app.listen(port, () => {
  console.log(`Servidor rodando em ${url}:${port}`);
});
