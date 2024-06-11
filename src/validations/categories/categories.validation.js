const { param, body, checkSchema } = require("express-validator");

const validateParamsId = param("id", "Must be a number").isNumeric().exists();
const validateCategoriesSchema = checkSchema({
  name: { isString: true, exists: true, isLength: { options: { max: 20 } }},
},['body'])

module.exports = { validateParamsId, validateCategoriesSchema };
