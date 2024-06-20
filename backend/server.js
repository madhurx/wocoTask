const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { default: mongoose } = require('mongoose');

require('dotenv').config();

const app = express();
app.use(express.json())

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then((data) => {
  console.log('MongoDB connected...');
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));