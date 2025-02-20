const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');

router.get('/home', watchController.listWatches);
router.post('/add', watchController.addWatch);
router.post('/delete/:id', watchController.deleteWatch);
router.post('/update/:id', watchController.updateWatch); 

module.exports = router;