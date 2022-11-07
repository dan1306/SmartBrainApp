const express = require("express");
const router = express.Router();
const profile = require("../../controllers/profile");

router.post("/profile/:id", profile.profile);

module.exports = router;