const express = require("express");
const router = express.Router();
const image = require("../../controllers/image");

router.put("/image", image.image);

module.exports = router;