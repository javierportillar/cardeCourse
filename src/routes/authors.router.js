const { Router } = require("express");
const {authorsController} = require("../controllers/authors.controller")
const authorsRouter = Router();

//Obtener Authores
authorsRouter.get("/", authorsController.getAllAuthors)

module.exports = {authorsRouter};