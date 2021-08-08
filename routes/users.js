const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send({ error: `Erro na consulta de usuários.` });
    return res.send(data);
  });
});

router.post('/create', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: 'Dados insuficientes' });

  Users.findOne({ email }, (error, data) => {
    if (error) return res.send({ error: 'Erro ao buscar o usuário' });
    if (data) return res.send({ error: 'Usuário já cadastrado' });

    Users.create({ email, password }, (error, data) => {
      if (error) return res.send({ error: `Erro ao criar o usuário ${error}` });

      data.password = undefined;
      return res.send(data);
    });
  });
});

module.exports = router;
