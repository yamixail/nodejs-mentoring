const City = require("../models/city");

function searchCities(req, res) {
	City.find({})
		.then(cities => {
			res.json(cities);
		})
		.catch(err => res.status(500).message({ message: err.message }));
}

function addCity(req, res) {
	const { id, name, country, lat, lng } = req.body;

	City.create({
		id,
		name,
		country,
		lat: parseFloat(lat),
		lng: parseFloat(lng)
	})
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
