import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	id: String,
	name: String,
	description: String,
	quantity: Number,
	category: String,
	reviews: [String]
});

export default mongoose.model("Product", productSchema);
