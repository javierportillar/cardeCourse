const { param, body, checkSchema } = require("express-validator");

const validateParamsId = param("id", "Must be a number").isNumeric().exists();

module.exports = { validateParamsId };
