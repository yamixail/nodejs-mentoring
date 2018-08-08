const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	country: { type: String, required: true },
	lat: { type: Number, min: -90, max: 90 },
	lng: { type: Number, min: -180, max: 180 }
});

module.exports = mongoose.model("City", citySchema);
