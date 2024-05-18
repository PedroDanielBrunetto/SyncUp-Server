const pool = require("../../Infra/Connection");

const Ideas = async (req, res) => {
  const { name, email, cel, idea } = req.body;

  console.log('Registrando nova ideia com os seguintes dados:', { name, email, cel, idea });

  try {
    let registerIdea = `
      INSERT INTO FutureClientsIdeas (Name, Email, Celphone, Idea) 
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(registerIdea, [name, email, cel, idea], (error, results) => {
      if (error) {
        console.error('Erro ao registrar a ideia:', error.stack);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      console.log('Idea registrada com sucesso.');
      return res.status(200).json({ message: 'Idea registrada com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao registrar a ideia:', error.stack);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = Ideas;
