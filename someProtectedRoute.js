// routes/someProtectedRoute.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/protected', requireAuth, (req, res) => {
  // Only authenticated users can access this route
  res.json({ message: 'You have access to this protected route.' });
});

module.exports = router;
