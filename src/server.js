"use strict";

//IMPORT
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const v1 = require("./routes/imageRoute")


//USE
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.STATIC_PAGES_DIR) {
  console.log(
    "serving static pages from express server at",
    process.env.STATIC_PAGES_DIR
  );
  app.use("/", express.static(process.env.STATIC_PAGES_DIR));
}

//Routes
// This version 1 route is still not protectect by authentication!!
app.use("/api/v1", v1);


module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log("App is running on port :: " + port));
  },
};