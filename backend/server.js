const express = require("express");
const userRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
//cors
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE",
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/api/", AuthRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI)
	.then((data) => {
		console.log("MongoDB connected...");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => console.log(err));
