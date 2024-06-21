const express = require('express');
const auth = require('../middleware/auth');
const { users, deleteUser, editUser, addUser } = require('../Controllers/UserController');
const router = express.Router();

router.get('/', users);
router.post('/add', addUser)
router.put('/:id', editUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
