const { authorsService } = require("../services/authors.service");

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
}

const authorsController = new AuthorsController();
module.exports = { authorsController };
