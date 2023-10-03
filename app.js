const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const RandomProperty = mongoose.model('RandomProperty', new mongoose.Schema({}));
const UserPreference = mongoose.model('UserPreference', new mongoose.Schema({}));

// Import your user and auth controllers
const { registerUser, loginUser } = require('./controllers/userController');
const { login } = require('./controllers/authController');

app.use(express.json());

// Define a directory for serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/randomproperties', async (req, res) => {
  try {
    const randomProperties = await RandomProperty.find();
    console.log('Retrieved random properties:', randomProperties);
    res.json(randomProperties);
  } catch (error) {
    console.error('Error fetching random properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userpreferences', async (req, res) => {
  try {
    const userPreferences = await UserPreference.find();
    console.log('Retrieved user preferences:', userPreferences);
    res.json(userPreferences);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Allow both GET and POST requests for /register and /login
app.route('/register')
  .get((req, res) => {
   // Serve your registration HTML page here
res.sendFile(path.join(__dirname, 'public', 'register.html'));

  })
  .post(registerUser);

app.route('/login')
  .get((req, res) => {
// Serve your registration HTML page here
res.sendFile(path.join(__dirname, 'public', 'register.html'));

  })
  .post(loginUser);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

