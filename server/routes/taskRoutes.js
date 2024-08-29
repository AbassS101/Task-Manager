const express = require('express');
const router = express.Router();

// Define routes here
router.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

module.exports = router;
