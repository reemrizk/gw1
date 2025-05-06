//mongoose schema

const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    deviceId: String,
    assocId: String,
    timestamp: {type: Date, default: Date.now},
    imageUrl: String,
});

module.exports = mongoose.model("Device", deviceSchema);