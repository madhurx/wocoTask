const User = require("../models/User");
const validator = require("validator");

const users = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

const addUser = async (req, res) => {
	const { firstName, lastName, email, phone } = req.body;

	if (!firstName || !lastName || !email || !phone) {
		return res
			.status(400)
			.json({ status: 400, message: "Please enter all fields" });
	}

	const nameRegex = /^[A-Z][a-z]*$/;
	if (!nameRegex.test(firstName)) {
		return res
			.status(400)
			.json({ status: 400, message: "First Name is not properly formatted" });
	}
	if (!nameRegex.test(lastName)) {
		return res
			.status(400)
			.json({ status: 400, message: "Last Name is not properly formatted" });
	}

	if (!validator.isEmail(email)) {
		return res
			.status(400)
			.json({ status: 400, message: "Invalid email format" });
	}

	if (!validator.isMobilePhone(phone)) {
		return res
			.status(400)
			.json({ status: 400, message: "Invalid phone format" });
	}

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.json({ status: 400, message: "User already exists" });
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			phone,
		});

		 await newUser.save();

		res.status(200).json({ status: 200, message: "User Added Successfully" });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ status: 400, message: "Server error" });
	}
};

const editUser = async (req, res) => {
	const { firstName, lastName, email } = req.body;

	if (!firstName || !lastName || !email) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;

		await user.save();
		res.json({ message: "User updated", user });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await user.remove();
		res.json({ message: "User removed" });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};
module.exports = { users, editUser, deleteUser, addUser };
