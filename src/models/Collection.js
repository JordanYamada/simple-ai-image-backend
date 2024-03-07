"use strict";

const Images = require("./Images/Images");

class Collection {
  constructor(model) {
    this.model = model;
  }

  getOne(id) {
    console.log(id);
    return this.model.findOne({ _id: id });
  }

  getAll() {
    // console.log(" in getAll: ", email);
    return this.model.find();
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  delete(id) {
    return this.model.deleteOne({ _id: id });
  }
}

module.exports = {
  images: new Collection(Images),
};