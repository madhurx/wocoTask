const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({ token, user: { id: newUser.id, firstName, lastName, email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Add CRUD operations for users
router.get('/', auth, async (req, res) => {
  try {
      const users = await User.find().select('-password');
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

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
