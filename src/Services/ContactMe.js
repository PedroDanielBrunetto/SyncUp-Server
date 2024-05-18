const pool = require("../../Infra/Connection");
const moment = require('moment-timezone');

const ContactMe = async (req, res) => {
  const email = req.params.email;
  // Define o fuso horário do Brasil (Horário de Brasília)
  const datetimeBR = moment.tz("America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss');

  try {
    let queryContactMe = `INSERT INTO ContactMeClients (Email, Data_Registro)
                 VALUES (?, ?)`;

    pool.query(queryContactMe, [email, datetimeBR], (error, results) => {
      if (error) {
        console.error('Erro ao registrar email:', error.stack);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      console.log('Email registrada com sucesso.');
      return res.status(200).json({ message: 'Email registrada com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao registrar a email:', error.stack);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  ContactMe
}