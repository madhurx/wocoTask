const express = require('express');
const { users, deleteUser, editUser, addUser, getUser } = require('../Controllers/UserController');
const router = express.Router();

router.get('/', users);
router.get('/:id', getUser)
router.post('/add', addUser)
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
