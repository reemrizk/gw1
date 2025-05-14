// parses request and calls service

const checkInService = require("../services/checkInService");

exports.handleCheckIn = async (req, res) => {
    try {
        const { assocId, PPM_barcode, PPM_written } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}`: null;

        const deviceId = await checkInService.checkIn({
            assocId,
            PPM_barcode,
            PPM_written,
            imageUrl,
        });

        res.status(201).json({ deviceId });

    }catch (err){
        console.error("Check in failed:", err);
        res.status(500).json({ error: "Check in failed"});
    }
};