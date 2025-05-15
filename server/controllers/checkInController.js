// parses request and calls service

const checkInService = require("../services/checkInService");

exports.handleCheckIn = async (req, res) => {
    try {
        const { assocId, ppmBarcode, ppmWritten } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}`: null;

        const deviceId = await checkInService.checkIn({
            assocId,
            ppmBarcode,
            ppmWritten,
            imageUrl,
        });

        res.status(201).json({ deviceId });

    }catch (err){
        console.error("Check in failed:", err);
        res.status(500).json({ error: "Check in failed"});
    }

    

};