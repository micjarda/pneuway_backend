const express = require('express');

const {
    test,
    login,
    authenticateToken
} = require('../controllers/authController');

const router  = express.Router();

router.post ('/login', login);

router.get ('/auth', authenticateToken);

router.get ('/test', test);

module.exports = router;