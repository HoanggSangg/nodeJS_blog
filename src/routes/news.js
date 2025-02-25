const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//newController.index
router.get('/:stug', newsController.show)
router.get('/', newsController.index)

module.exports = router;