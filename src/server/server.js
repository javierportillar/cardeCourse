const express = require("express");
const morgan = require("morgan");

class Server {
  app;

  constructor() {
    this.app = express();
    this.initialize();
  }

  initialize() {
    this.app.use(express.json());
    this.app.use(morgan());
  }

  addRouter(path, router) {
    this.app.use(path, router);
  }

  createServer(port, cb) {
    this.app.listen(port, cb);
  }
}

module.exports = { Server };
