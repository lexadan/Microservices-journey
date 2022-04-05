const express = require('express');
const router = express.Router();

const service = require('../../services/v1/auth');

router.post('/login', service.login);

router.post('/register', service.register);

module.exports = router;