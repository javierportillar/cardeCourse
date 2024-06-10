const { database } = require("../database/database");

class AuthorsService {
  async getAllAuthors() {
    const authors = await database.getRows("SELECT * FROM AUTHORS");
    return authors;
  }
  async checkAuthors(ids) {
    const SQLids = ids.join(",");
    const result = await database.getRows(
      `SELECT id FROM authors WHERE id IN(${SQLids})`
    );
    return result.length === ids.length; // ESTO ES DE CRACKS, DE PROS.
  }
}

const authorsService = new AuthorsService();

module.exports = { authorsService };
