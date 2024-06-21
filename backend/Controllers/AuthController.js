const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const validator = require("validator");

const register = async (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body;

	if (!firstName || !lastName || !email || !password || !phone) {
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
			password: await bcrypt.hash(password, 10),
		});

		await newUser.save();

		const token = jwt.sign(
			{ id: newUser.id, fullName: firstName + " " + lastName },
			process.env.JWT_SECRET,
			{
				expiresIn: 3600,
			},
		);
		res.json({
			token,
			user: { id: newUser.id, firstName, lastName, email, phone },
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ status: 400, message: "Server error" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ status: 400, message: "Please enter all fields" });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ status: 400, message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ status: 400, message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.id, fullName: user.firstName + " " + user.lastName },
			process.env.JWT_SECRET,
			{
				expiresIn: 3600,
			},
		);
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
		res.status(500).json({ status: 400, message: "Server error" });
	}
};

module.exports = { register, login };
