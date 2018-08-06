import mongoose, { Schema } from "mongoose";

const citySchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	country: { type: String, required: true },
	lat: { type: Number, min: -90, max: 90 },
	lng: { type: Number, min: -180, max: 180 },
	lastModifiedDate: Date
});

citySchema.pre("save", function(next) {
	this.lastModifiedDate = new Date();

	next();
});

citySchema.pre("findOneAndUpdate", function() {
	this.update({}, { lastModifiedDate: new Date() });
});

export default mongoose.model("City", citySchema);
