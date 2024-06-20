const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { users } = require('../Controllers/UserController');
const router = express.Router();





router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Add CRUD operations for users
router.get('/', users)

router.put('/:id', auth, async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      await user.save();
      res.json({ message: 'User updated', user });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await user.remove();
      res.json({ message: 'User removed' });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
