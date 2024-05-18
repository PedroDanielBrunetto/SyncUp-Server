require('dotenv').config();
const express = require('express');
const app = express();
const Ideas = require('./Services/Ideas');
const { ContactMe } = require('./Services/ContactMe');
const pool = require('../Infra/Connection');

// Middleware para processar dados do corpo da requisição
app.use(express.json());

const port = process.env.PORT || 3000;
const url = process.env.URL || 'http://localhost';

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
  connection.release();
});

app.get('/', (req, res) => {
  res.send('<a href="http://www.syncupbrasil.tech" style="font-weight: 600;">Conheça a SyncUp Brasil.</a>');
});

app.post('/register', Ideas);
app.post('/contactMe/:email', ContactMe);

app.listen(port, () => {
  console.log(`Servidor rodando em ${url}:${port}`);
});
