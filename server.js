const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User, Address } = require('./model');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


  app.post('/register', async (req, res) => {
    try {
      const { name, address } = req.body;
  
      // Create a new user
      const newUser = new User({ name });
      const savedUser = await newUser.save();
  
      // Create a new address and link it to the user
      const newAddress = new Address({
        userId: savedUser._id, 
        address,
      });
      await newAddress.save();
  
      res.status(201).json({ message: 'User and address created successfully' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

const PORT =  8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
