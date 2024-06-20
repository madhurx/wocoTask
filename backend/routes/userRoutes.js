const express = require('express');
const auth = require('../middleware/auth');
const { users, deleteUser, editUser } = require('../Controllers/UserController');
const router = express.Router();

router.get('/', users)
router.put('/:id', editUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
