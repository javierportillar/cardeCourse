const { Router } = require("express");
const {
  categoriesController,
} = require("../controllers/categories.controller");
const {
  validateParamsId, validateCategoriesSchema
} = require("../validations/categories/categories.validation");
const {
  validateErrosMiddleWare,
} = require("../middlewares/validateErros.middleware");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/:id", [
  validateParamsId,
  validateErrosMiddleWare,
  categoriesController.getCategoryById,
]);

categoriesRouter.post("/", [
  validateCategoriesSchema,
  validateErrosMiddleWare,
  categoriesController.createNewCategory,
]);

module.exports = { categoriesRouter };
