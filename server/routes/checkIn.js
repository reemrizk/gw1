const express = require("express");
const multer = require("multer");
const checkInController = require("../controllers/checkInController");

const router = express.Router();

// Multer setup (INLINE)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Route uses inline upload 
router.post("/", upload.single("image"), checkInController.handleCheckIn);

module.exports = router;
