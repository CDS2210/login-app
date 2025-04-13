const express = require('express');
const router = express.Router();

/* GET home page (health check) */
router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

/* Allow preflight OPTIONS for /login */
router.options('/login', (req, res) => {
  res.sendStatus(200);
});

/* POST /login */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple hardcoded auth for demo
  if (email === 'student@example.com' && password === '123456') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;


