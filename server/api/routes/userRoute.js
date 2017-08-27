const express = require('express');
const asyncErrorMiddleware = require('../../utils/asyncErrorMiddleware');
const { login } = require('../controllers/userController');

const router = express.Router();

router.post('/login', asyncErrorMiddleware(login));

module.exports = router;
