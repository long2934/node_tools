'use strict';

const express = require('express');
const toolsController = require('../controllers/tools_controller');

const router = express.Router();

router.route('/pfx2pem')
    .post(toolsController.pfx2pem);

module.exports = router;