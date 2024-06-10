const { authorsRouter } = require("./routes/authors.router");
const { booksRouter } = require("./routes/books.router");
const { Server } = require("./server/server");
const { config } = require("dotenv");

config({
  path: ".env.javier",
});

// console.log(process.env.PORT, 'Hola');

const server = new Server();

server.addRouter("/books", booksRouter);
server.addRouter("/authors", authorsRouter);

server.createServer(process.env.PORT, () => {
  console.log("Listening on Port", process.env.PORT);
});
