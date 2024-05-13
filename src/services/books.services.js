const {database} = require("../database/database");

class BooksService {

  async getAllBooks(){
    const books = await database.getRows("SELECT * FROM BOOKS");
    return books;
  }

  async getOneBookById(id){
    console.log(id);
    const book = await database.getRow(
      `SELECT * FROM BOOKS WHERE id=${id} limit 1`
    );
    return book;
  }

  async createBook(body){
    const book = await database.create(`INSERT INTO books (name) VALUES('${body.name}')`);
    return book;
  }
}

const booksService = new BooksService();

module.exports = {booksService};