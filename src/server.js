"use strict";

//IMPORT
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const v1 = require("./routes/routes")


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is listening");
});

//connect mongoose to mongo
if (process.env.NODE_ENV === "test") {
  mongoose.connect(global.__MONGO_URI__);
} else {
  mongoose.connect(process.env.DB_URL);
}


//USE
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/', (request, response) => {
  try {
    response.status(200).send('Proof of life');
  } catch(e) {
    console.log(e);
  }
});


module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log("App is running on port :: " + port));
  },
};