const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

router.get('/', auth, (req, res) => {
  return res.send({ message: `Info importante ${res.locals.auth_data.id}` });
});

module.exports = router;
