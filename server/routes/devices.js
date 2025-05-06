const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Image upload and storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//POST
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { deviceId, assocId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newDevice = await prisma.applianceIn.create({
      data: {
        deviceId: deviceId,
        assocId: assocId,
        imageUrl: imageUrl,
      },
    });

    res.status(201).json(newDevice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving device data" });
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const devices = await prisma.applianceIn.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});


// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedDevice = await prisma.applianceIn.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     res.status(200).json({ message: "Device deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete device" });
//   }
// });

module.exports = router;
