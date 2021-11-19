'use strict';

const express = require('express');
const logger = require('../utils/logger').logger;
const controller = require('../controllers/status_check');
const router = express.Router();

router
    .get('/', controller.getStatus)
    .get('/health', controller.getHealth);

module.exports = router;
