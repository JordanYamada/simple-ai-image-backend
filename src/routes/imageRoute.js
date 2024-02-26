"use strict";

const express = require("express");
const router = express.Router();
const { aiImage } = require("../controllers/imageController")

router.post("/dallE", aiImage);

module.exports = router;