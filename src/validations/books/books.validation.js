const { param, body, checkSchema } = require("express-validator");

const validateParamsId = param("id", "Must be a number").isNumeric().exists();

const validateBooksSchema = checkSchema({
  name: { isString: true, exists: true, isLength: { options: { max: 20 } } },
  pages: { isNumeric: true, exists: true },
  summary: {
    isString: true,
    optional: true,
    isLength: { options: { min: 20 } },
  },
  bibliography: {
    isString: true,
    optional: true,
    isLength: { options: { min: 20 } },
  },
  categories: { isArray: { options: { min: 1 } } },
  'categories.*': {isNumeric: true},
  authors: { isArray: { options: { min: 1 } } },
  'authors.*' : {isNumeric: {
    // errorMessage: "Debe ser num o string"
  }}
},['body']);


const validateParamsBody = [
  body("name").isString().exists().isLength({ max: 20 }),
  body("pages").isNumeric().exists(),
  body("summary").isString().isLength({min:20}).optional(),
  body("bibliography").isString().isLength({min:20}),
  body("categories").isArray().exists(),
  body("authors").isArray().exists(),
  body("categories.*").isNumeric(),
];

module.exports = { validateParamsId, validateBooksSchema };
