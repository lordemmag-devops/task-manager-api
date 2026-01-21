const { configDotenv } = require("dotenv");
const { success, error } = require('../utils/response');

exports.success = (res, message, data = null) => {
    return res.status(200).json({
        status: 'success',
        message,
        data,
    });
};

exports.error = (res, message, statusCode = 400) => {
    return res.status(code).json({
        status: 'error',
        message,
    });
}; 