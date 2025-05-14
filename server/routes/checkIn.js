const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST /api/check-in
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { assocId, ppmWritten, ppmBarcode } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const deviceId = `DEV-${Date.now()}`; // simple unique ID

    // Create ApplianceIn record
    const appliance = await prisma.applianceIn.create({
      data: {
        deviceId,
        assocId,
        imageUrl,
        ppmBarcode,
        ppmWritten,
      },
    });

    // Dummy values
    const attributes = [
      { attribute: "SerialNumber", value: `SN-${Math.floor(Math.random() * 100000)}` },
      { attribute: "Manufacturer", value: "EU" },
      { attribute: "PrimaryVoltage", value: "120V" },
      { attribute: "SecondaryVoltage", value: "24V" },

    ];

    for (const attr of attributes) {
      await prisma.appDetails.create({
        data: {
          deviceId,
          attribute: attr.attribute,
          value: attr.value,
        },
      });
    }

    res.status(201).json({ deviceId });
  } catch (err) {
    console.error("Check-in failed:", err);
    res.status(500).json({ error: "Failed to check in device" });
  }
});

module.exports = router;
