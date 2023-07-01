const { MongoClient } = require('mongodb');
// const bcrypt = require('bcrypt');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const loginForUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db('findyourpro');
    const collection = db.collection('users');

    // Find user with the given email
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User is authenticated, include user data in the response
    res.status(200).json({ message: 'Login successful', userData: user });

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const loginForBusiness = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db('findyourpro');
    const collection = db.collection('companies');

    // Find user with the given email
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User is authenticated, include user data in the response
    res.status(200).json({ message: 'Login successful', userData: user });

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { loginForUser, loginForBusiness};
