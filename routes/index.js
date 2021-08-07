const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({ message: `Você esta na home` });
});

module.exports = router;
