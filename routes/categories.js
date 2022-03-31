var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Category = require("../db/models/categories");

router.get("/", (req, res, next) => {
  Category.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res, next) => {
  const data = req.body;
  const category1 = new Category ({
    code: data.code,
    name: data.name
  });
  category1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

module.exports = router;
