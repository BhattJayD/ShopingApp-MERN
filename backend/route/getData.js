const express = require("express");
const axios = require("axios");
const route = express.Router();

var data = [];

function getdata() {
  console.log("fun call");
  axios("https://fakestoreapi.com/products")
    .then((r) => (data = r.data))
    .catch((e) => console.log(e));
}
getdata();

route.get("/getdata", function (req, res) {
  // res.send('Hello World')
  if (data.length > 0) {
    console.log("hasData");
    res.send(JSON.stringify(data)).status(200);
  } else {
    console.log("callData");
    getdata();
    res.send(JSON.stringify(data));
  }
});
module.exports = route;
