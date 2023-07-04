"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const changeSchedule = async (request, response) => {
	const {  } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { changeSchedule };
