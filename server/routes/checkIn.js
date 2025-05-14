const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), checkInController.handleCheckIn);

module.exports = router;