import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	id: String,
	name: String,
	description: String,
	quantity: Number,
	category: String,
	reviews: [String]
});

export default mongoose.model("Product", productSchema);
