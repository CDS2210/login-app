var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'API is running' });
});

/* POST /login */
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  if (email === 'student@example.com' && password === '123456') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;

