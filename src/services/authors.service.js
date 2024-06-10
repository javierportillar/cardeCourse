const { database } = require("../database/database");

class AuthorsService {
  async getAllAuthors() {
    const authors = await database.getRows("SELECT * FROM AUTHORS");
    return authors;
  }

  async getAuthorById(id) {
    console.log(id);
    const author = await database.getRow(
      `SELECT * FROM AUTHORS WHERE id=${id} limit 1`
    );
    return author;
  }

  async createAuthor(body) {
    const { name, age, gender, categories } = body;
    const ageValue = age !== undefined ? `'${age}'` : "NULL";
    const genderValue = gender ? `'${gender}'` : "NULL";
    const categorieValue = categories ? `'${categories}'` : "NULL";
    const author = await database.create(
      `INSERT INTO authors (name, age, gender, category_id) VALUES('${name}',${ageValue},${genderValue},${categorieValue})`
    );
    // await this.createAuthorsCategories(categorieValue, author.id);

    return author;
  }


  async createAuthorsCategories(categories, authorId) {
    if (categories && categories.every((categoryId) => categoryId !== null)) {
      const arrayAuthorsCategories = categories.map((categoryId) => {
        return `( ${authorId},${categoryId})`;
      });
      const SQLvalues = arrayAuthorsCategories.join(",");
      const result = await database.createMany(
        `INSERT INTO authors_categories (author_id, category_id) VALUES ${SQLvalues}`
      );
      return result;
    } else {
      throw new Error("Invalid categories array");
    }
  }

  // async createAuthorsCategories(categories, authorId) {
  //   if (categories && categories.every((categoryId) => categoryId !== null)) {
  //     await this.createAuthorsCategories(categories, author.id);
  //   } else {
  //     throw new Error("Invalid categories array");
  //   }

  //   const arrayAuthorsCategories = categories.map((categoryId) => {
  //     return `( ${authorId},${categoryId})`;
  //   });
  //   const SQLvalues = arrayAuthorsCategories.join(",");
  //   console.log(SQLvalues);
  //   const result = await database.createMany(
  //     `INSERT INTO authors_categories (author_id, category_id) VALUES ${SQLvalues}`
  //   );
  //   return result;
  // }

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
