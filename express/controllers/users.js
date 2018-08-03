import db from "../models";

const users = {};

users.getAll = (req, res) => {
	db.User.findAll()
		.then(users => {
			return res.json(users);
		})
		.catch(err => res.status(500).message({ message: err.message }));
};

export default users;
