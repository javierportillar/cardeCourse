const { param, body } = require("express-validator");

const validateParamsId = param("id", "Must be a number")
  .isNumeric()
  .exists();
const validateParamsBody = [
  body("name").isString().exists().isLength({ max: 20 }),
  body("pages").isNumeric().exists(),
  body("summary").isString().isLength({min:20}).optional(),
  body("bibliography").isString().isLength({min:20}),
  body("categories").isArray().exists(),
  body("authors").isArray().exists(),
];

module.exports = { validateParamsId, validateParamsBody };
