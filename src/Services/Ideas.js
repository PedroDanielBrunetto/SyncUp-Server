const db = require("../../Infra/Connection");

const Ideas = async (req, res) => {
  const { name, email, cel, idea } = req.body;

  try {

    let registerIdea = `
      INSERT INTO FutureClientsIdeas (Name, Email, Celphone, Idea) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(registerIdea, [name, email, cel, idea], (error, results, fields) => {
      // Fechando a conexão com o banco de dados após a execução da consulta
      db.end();
      
      if (error) {
        console.error('Erro ao registrar a ideia: ' + error.stack);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      console.log('Idea registrada com sucesso.');
      return res.status(200).json({ message: 'Idea registrada com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao registrar a ideia: ' + error.stack);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = Ideas;
