const { Router } = require("express");
const { authorsController } = require("../controllers/authors.controller");
const {
  validateErrosMiddleWare,
} = require("../middlewares/validateErros.middleware");

const {
  validateParamsId,
} = require("../validations/authors/authors.validation");

const authorsRouter = Router();

//Obtener Authores
authorsRouter.get("/", authorsController.getAllAuthors);

authorsRouter.get("/:id", [
  validateParamsId,
  validateErrosMiddleWare,
  authorsController.getAuthorById,
]);

module.exports = { authorsRouter };
