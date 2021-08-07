const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const obj = req.query;
  return res.send({ message: `Usuário ${obj.name} tem ${obj.yearsOld} anos` });
});

router.post('/create', (req, res) => {
  const obj = req.query;
  return res.send({ message: `Usuário cadastrado` });
});

module.exports = router;
