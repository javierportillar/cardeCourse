const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");
const {validationResult, param} = require("express-validator");

const booksRouter = Router();

//Obtener todos los books
booksRouter.get("/", booksController.getAllBooks);

//Obtener un book
booksRouter.get("/:id", [(req,res,next)=>{
  param("id").isNumeric().run();
  const resultValidated = validationResult(req);
  console.log(resultValidated);
  return next();
} ,booksController.getBookById]);

//Crear un book
booksRouter.post("/", booksController.createBook);

module.exports = { booksRouter };
