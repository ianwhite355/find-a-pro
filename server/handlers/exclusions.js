"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const exclusionsPost = async (request, response) => {
    const { day, month, year, time } = request.body
	const _id = request.params._id;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const times = await db.collection("times").updateOne({ _id }, { $push: { exclusions: { day, month, year, time}}});

		if (times.modifiedCount > 0) {
			response.status(200).json({ status: 200, message: "Exclusion has been added" });
		} else {
			response.status(404).json({ status: 404, message: "Company not found" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};


module.exports = {
    exclusionsPost
};
