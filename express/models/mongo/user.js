import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String
});

export default mongoose.model("User", userSchema);
