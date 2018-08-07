import City from "../../models/mongo/city";

const cities = {};

cities.getAll = (req, res) => {
	City.find({})
		.then(cities => {
			return res.json(cities);
		})
		.catch(err => res.status(500).message({ message: err.message }));
};

cities.createCity = (req, res) => {
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
};

cities.getCity = (req, res) => {
	City.findOne({ id: req.params.id })
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			res.json(product);
		})
		.catch(err =>
			res
				.status(500)
				.json({ message: "somthing went wrong" + err.message })
		);
};

cities.putCity = (req, res) => {
	City.findOneAndUpdate({ id: req.params.id }, req.body, {
		upsert: true,
		new: true
	})
		.then(city => res.json(city))
		.catch(err =>
			res
				.status(500)
				.json({ message: "somthing went wrong" + err.message })
		);
};

cities.deleteCity = (req, res) => {
	City.findOneAndRemove({ id: req.params.id })
		.then(product => {
			if (!product) {
				return res.status(404).json({ message: "no such item" });
			}

			res.json(product);
		})
		.catch(err =>
			res
				.status(500)
				.json({ message: "somthing went wrong" + err.message })
		);
};

export default cities;
