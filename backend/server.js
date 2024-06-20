const express = require("express");
const userRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*', 
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));

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
