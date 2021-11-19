'use strict';

const logger = require('../utils/logger').logger;
const common = require('../utils/common');
const { STATUS, HTTP_STATUS } = require('../utils/constant');

const status = {
    getStatus: (req, res) => {
        logger.log({
            level: 'info',
            message: 'Checking server health'
        });

        const data = {
            error_code: 0,
            api_versions: [1]
        };

        res.status(HTTP_STATUS.OK)
            .json(common.createResponse(STATUS.OK, data));
    },
    getHealth: (req, res) => {
        res.status(HTTP_STATUS.OK)
            .json(common.createResponse(STATUS.OK, {}));
    },
};

module.exports = status;