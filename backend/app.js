const express = require("express");
const app = express();
const cors = require("cors");
const getdata = require("./route/getData");
const checkOut = require("./route/checkOut");
const bodyParser = require("body-parser");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.options("*", cors());
app.use(cors());
app.use("/api", getdata);
app.use("/api", checkOut);

app.listen(5000, () => {
  console.log("server stared");
});
