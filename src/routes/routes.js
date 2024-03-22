"use strict";

const express = require("express");
const router = express.Router();
const dataModules = require("../models/Collection");


const { aiImage } = require("../controllers/imageController")
const { saveImage } =require("../controllers/saveImageController")



router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});


// All routes
router.post("/dallE", aiImage);
router.post('/saveImage', saveImage)
router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);


async function handleGetAll(req, res) {
  // const email = req.user.email;
  let allRecords = await req.model.getAll();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  // const email = req.user.email;
  let theRecord = await req.model.getOne(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  console.log('REQ', req);
  let obj = req.body;
  console.log('REQ.BODY', obj);
  // obj.email = req.user.email;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  // const email = req.user.email;
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;

  // can only delete images associated with authorized user from auth0
  // let email = req.user.email;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;