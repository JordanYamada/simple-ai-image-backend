"use strict";

const express = require("express");
const router = express.Router();


const { aiImage } = require("../controllers/imageController")
const { saveImage } =require("../controllers/saveImageRoute")

router.post("/dallE", aiImage);
router.post('/saveImage', saveImage)


module.exports = router;