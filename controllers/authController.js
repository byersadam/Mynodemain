const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Implement user authentication (e.g., verify email and password)

    // For demo purposes, assume successful authentication
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};
