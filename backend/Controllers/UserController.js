const User = require("../models/User");

const users = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { users };