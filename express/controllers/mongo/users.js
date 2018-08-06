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

users.getUser = (req, res) => {
	User.findOne({ id: req.params.id })
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: "no such user" });
			}

			res.json(user);
		})
		.catch(err =>
			res
				.status(500)
				.json({ message: "something went wrong" + err.message })
		);
};

users.deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.id)
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: "no such user" });
			}

			res.json(user);
		})
		.catch(err =>
			res
				.status(500)
				.json({ message: "something went wrong: " + err.message })
		);
};

export default users;
