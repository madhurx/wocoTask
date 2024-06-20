const User = require("../models/User");

const users = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

const editUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
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
}
module.exports = { users, editUser, deleteUser };