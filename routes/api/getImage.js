const express = require("express");
const router = express.Router();
const getImage = require("../../controllers/getImage");

router.post("/getImage", getImage.getImage);

module.exports = router;