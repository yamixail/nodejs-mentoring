import User from "../../models/mongo/user.js";

const users = {};

users.getAll = (req, res) => {
	console.log("here");
	User.find({})
		.then(users => {
			return res.json(users);
		})
		.catch(err => res.status(500).message({ message: err.message }));
};

export default users;
