const express = require('express');
const asyncErrorMiddleware = require('../../utils/asyncErrorMiddleware');
const {
  getUser,
  login,
  addUser,
  removeUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/get/:id?', asyncErrorMiddleware(getUser));
router.post('/login', asyncErrorMiddleware(login));
router.post('/add', asyncErrorMiddleware(addUser));
router.delete('/remove/:user', asyncErrorMiddleware(removeUser));

module.exports = router;
