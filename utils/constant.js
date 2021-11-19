'use strict';

module.exports = {
    STATUS: {
        OK: 'success',
        FAIL: 'fail',
    },
    ERROR: {
        MISSING_PARAM: 'missing parameter'
    },
    HTTP_METHOD: {
        GET: 'GET',
        POST: 'POST',
    },
    HTTP_STATUS: {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    UPOP_DECLARE_RESULT:{
        UNDECLARED:'UNDECLARED',
        PROCESSING:'PROCESSING',
        SUCCESS:'SUCCESS',
        FAIL:'FAIL'
    },
    VALID_VENDOR:['wechatpay','alipay','upop'],
    VERSION: 'china_customs v1.0.0',
};