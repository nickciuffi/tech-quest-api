"use strict";Object.defineProperty(exports, "__esModule", {value: true});

class HomeController {
  async index(req, res) {
    res.json('Welcome to my amazing api.');
  }
}

exports. default = new HomeController();
