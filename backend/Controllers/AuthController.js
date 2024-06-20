const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const register = async (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body;

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			phone,
			password: await bcrypt.hash(password, 10),
		});

		await newUser.save();

		const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
			expiresIn: 3600,
		});
		res.json({
			token,
			user: { id: newUser.id, firstName, lastName, email, phone },
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: "Server error" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: 3600,
		});
		res.json({
			token,
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { register, login };
