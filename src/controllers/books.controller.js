const { body } = require("express-validator");
const { database } = require("../database/database");
const {booksService} = require("../services/books.services");
const {categoriesService} = require('../services/categories.service');
const { authorsService } = require("../services/authors.service");

class BooksController {
  async getAllBooks(req, res) {
   const books = await booksService.getAllBooks();
   return res.json(books).status(200);
  }

  async getBookById(req, res) {
    const book = await booksService.getOneBookById(req.params.id);
    return book
      ? res.status(200).json(book)
      : res.status(404).json({ message: "not found" });
  }

  async createBook(req, res) {
    const checkCategValidate = await categoriesService.checkCategories(req.body.categories);
    
    const checkAuthorsValidate = await authorsService.checkAuthors(req.body.authors);

    if (!checkCategValidate) return res.status(409).json({message: 'No existe la categoría'});
    if (!checkAuthorsValidate) return res.status(409).json({message: 'No existe el autor'});
    
    const book = await booksService.createBook(req.body);
    return res.status(201).json(book);
  }
}

const booksController = new BooksController();

module.exports = { booksController };
