var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Account = require("../db/models/accounts")

/* GET products listing. */
router.get("/", (req, res, next) => {
  Account.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

// Create new account
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const account1 = new Account({
    code: data.code,
    firstName: data.firstName,
    lastName: data.lastName,
    balance: data.balance
  })
  account1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

module.exports = router;
