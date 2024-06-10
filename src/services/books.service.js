const { database } = require("../database/database");

class BooksService {
  async getAllBooks() {
    const books = await database.getRows("SELECT * FROM BOOKS");
    return books;
  }

  async getOneBookById(id) {
    const book = await database.getRow(
      `SELECT * FROM BOOKS WHERE id=${id} limit 1`
    );
    return book;
  }

  async createBook(body) {
    const { name, pages, categories, bilbiography, summary, authors } = body;
    const bilbiographyValue = bilbiography ? `'${bilbiography}'` : null;
    const summaryValue = summary ? `'${summary}'` : null;
    const book = await database.create(
      `INSERT INTO books (name, page_number, bibliography, summary) VALUES('${name}',${pages},${bilbiographyValue},${summaryValue})`
    );
    await this.createBooksCategories(categories, book.id);
    return book;
  }

  async createBooksCategories(categories, bookId) {
    // Categories = [1,2,3]
    // bookId = 2
    // arrayBC = [(1,2),(2,2),(3,2)]
    // SQLV = (1,2),(2,2),(3,2)

    const arrayBookCategories = categories.map((categoryId) => {
      return `(${categoryId},${bookId})`;
    });
    const SQLvalues = arrayBookCategories.join(",");
    const result = await database.createMany(
      `INSERT INTO books_categories (category_id, book_id) VALUES ${SQLvalues}`
    );
    console.log(result);
    return result;
  }
}

const booksService = new BooksService();

module.exports = { booksService };
