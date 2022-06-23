const express = require("express");
const route = express.Router();

route.post("/checkout", (req, res) => {
  console.log(req.body);
  res.send("got");
});

module.exports = route;
