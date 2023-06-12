const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.get("/search", async (req, res, next) => {
  try {
    res.send("Hello world!");
  } catch (error) {
    res.send("ds")
  }
});

module.exports = router;
