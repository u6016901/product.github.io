var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Transections = require("../db/models/transections");
var Account = require("../db/models/accounts")

/* GET products listing. */
router.get("/", (req, res, next) => {
  Transections.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/day", (req, res, next) => {
  const dateNowYear = new Date().getFullYear()
  const dateNowMonth = new Date().getMonth()
  const dateNowDate = new Date().getDate()
  Transections.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      var x = []
      for (let i = 0; i < result.length; i++) {
        var currentValue = result[i];
        if (currentValue.createAt.getFullYear() === dateNowYear && currentValue.createAt.getMonth() === dateNowMonth && currentValue.createAt.getDate() === dateNowDate)
        {
          x.push(currentValue)
        }
      }
      res.json(x);
    }
  });
});

router.get("/month", (req, res, next) => {
  const dateNowYear = new Date().getFullYear()
  const dateNowMonth = new Date().getMonth()
  Transections.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      var x = []
      for (let i = 0; i < result.length; i++) {
        var currentValue = result[i];
        if (currentValue.createAt.getFullYear() === dateNowYear && currentValue.createAt.getMonth() === dateNowMonth)
        {
          x.push(currentValue)
        }
      }
      res.json(x);
    }
  });
});
router.get("/year", (req, res, next) => {
  const dateNowYear = new Date().getFullYear()
  Transections.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      var x = []
      for (let i = 0; i < result.length; i++) {
        var currentValue = result[i];
        if (currentValue.createAt.getFullYear() === dateNowYear)
        {
          x.push(currentValue)
        }
      }
      res.json(x);
    }
  });
});

// Create new product
router.post("/", (req, res, next) => {
  var account1 = await Account.findOne({});
  const data = req.body;
  const transection1 = new Transections({
    code: data.code,
    categoryName: data.categoryName,
    amount: data.amount,
    createAt: data.createAt
  });
  account1.balance -= data.amount
  transection1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
  await account1.save();
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Transections.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put("/:id", async (req, res, next) => {
  var account1 = await Account.findOne({});
  const data = req.body;
  const id = req.params.id;
  var transection1 = await Transections.findOne({ _id: id });
  account1.balance += transection1.amount
  transection1.code = data.code;
  transection1.categoryName = data.categoryName;
  transection1.amount = data.amount;
  transection1.createAt = data.createAt;
  account1.balance -= data.amount
  await transection1.save();
  await account1.save();
  res.status(200).json(transection1);
});


module.exports = router;
