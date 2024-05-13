const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");
const { validationResult, param } = require("express-validator");
const {
  validateErrosMiddleWare,
} = require("../middlewares/validateErros.middleware");
const {
  validateParamsId, validateParamsBody,
} = require("../validations/books/validateParamId.validation");

const booksRouter = Router();

//Obtener todos los books
booksRouter.get("/", booksController.getAllBooks);

//Obtener un book
booksRouter.get("/:id", [
  validateParamsId,
  validateErrosMiddleWare,
  booksController.getBookById,
]);

//Crear un book
booksRouter.post("/", [validateParamsBody, validateErrosMiddleWare, booksController.createBook]);

module.exports = { booksRouter };
