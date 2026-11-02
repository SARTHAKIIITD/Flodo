const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.login);
router.get('/signup', pageControllers.signup);
router.get('/dashboard', pageControllers.dashboard);
router.use(pageControllers.error404);

module.exports = router;