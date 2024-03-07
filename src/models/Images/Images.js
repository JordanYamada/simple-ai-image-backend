"use strict";

//bring in mongoose
const mongoose = require("mongoose");

//extract the schema property from mongoose object
const { Schema } = mongoose;

//declare the user schema
const imageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// define the model

// allows our `Model` to use `mongoose` methods
const Images = mongoose.model("images", imageSchema);

module.exports = Images;