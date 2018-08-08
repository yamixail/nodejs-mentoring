const City = require("../models/city");

function searchCities(req, res) {
	City.find({})
		.then(cities => {
			res.json(cities);
		})
		.catch(err => res.status(500).message({ message: err.message }));
}

function addCity(req, res) {
	City.create(req.swagger.city.value)
		.then(item => res.json(item))
		.catch(err => {
			console.error(err);

			res.status(500).json({ message: "something went wrong" });
		});
}

module.exports = {
	searchCities,
	addCity
};
