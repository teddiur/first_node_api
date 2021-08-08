const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUserToken = userId => {
  return jwt.sign({ id: userId }, config.jwt_pass, {
    expiresIn: config.jwt_expires,
  });
};

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de  usuários.' });
  }
});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: 'Dados insuficientes' });

  try {
    if (await Users.findOne({ email }))
      return res.status(400).send({ error: 'Usuário já cadastrado' });

    const user = await Users.create({ email, password });
    user.password = undefined;
    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: 'Erro ao buscar o usuário' });
  }
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: 'Dados insuficientes' });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user)
      return res.status(401).send({ error: 'Usuário não registrado!' });

    const pass_ok = await bcrypt.compare(password, user.password);
    if (!pass_ok)
      return res.status(400).send({ error: 'Erro ao autenticar o usuário' });

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: `Erro ao buscar o usuário! ${err}` });
  }
});

module.exports = router;
