const express = require('express');
const asyncErrorMiddleware = require('../../utils/asyncErrorMiddleware');
const { login, addUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', asyncErrorMiddleware(login));
router.post('/add', asyncErrorMiddleware(addUser));

module.exports = router;
