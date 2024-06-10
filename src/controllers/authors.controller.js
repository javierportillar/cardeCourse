const { authorsService } = require("../services/authors.service");

class AuthorsController {
  async getAllAuthors(req, res) {
    const authors = await authorsService.getAllAuthors();
    return res.json(authors).status(200);
  }
}

const authorsController = new AuthorsController();
module.exports = { authorsController };
