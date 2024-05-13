const { validationResult } = require("express-validator");

const validateErrosMiddleWare = async (req,res,next) => {
  const result = validationResult(req);
  const errors = result.array();
  console.log(result);
  if (errors.length >0){
    return res.status(400).json(errors);
  }
  return next();
};

module.exports = {validateErrosMiddleWare};
