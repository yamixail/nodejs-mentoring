import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String
});

export default mongoose.model("User", userSchema);
