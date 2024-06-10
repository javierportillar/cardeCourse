const { authorsService } = require("../services/authors.service");
const { categoriesService } = require("../services/categories.service");

class AuthorsController {
  async getAllAuthors(req, res) {
    const authors = await authorsService.getAllAuthors();
    return res.json(authors).status(200);
  }

  async getAuthorById(req, res) {
    const author = await authorsService.getAuthorById(req.params.id);
    return author
      ? res.json(author).status(200)
      : res.status(404).json({ message: "not found" });
  }

  async createAuthor(req, res) {
    const checkCategValidate = await categoriesService.checkCategories(req.body.categories);
    if (!checkCategValidate) return res.status(409).json({message: 'No existe la categoría'});

    const author = await authorsService.createAuthor(req.body);
    return res.status(201).json(author);
  }
}

const authorsController = new AuthorsController();
module.exports = { authorsController };
