const { param, body, checkSchema } = require("express-validator");

const validateParamsId = param("id", "Must be a number").isNumeric().exists();

const validateAuthorsSchema = checkSchema(
  {
    name: { isString: true, exists: true, isLength: { options: { max: 20 } } },
    age: { isNumeric: true, optional: true },
    gender: {
      isString: true,
      isLength: { options: { max: 2 } },
    },
    categories: { isArray: { options: { min: 1 } } },
    "categories.*": { isNumeric: true },
  },
  ["body"]
);

module.exports = { validateParamsId, validateAuthorsSchema };
