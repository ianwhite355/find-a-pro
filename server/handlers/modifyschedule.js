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

    //this will change a good amount really just it will change
    const { companyId } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

        const modifySchedule = await db.collection("times").updateOne({ _id: companyId})

		
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { changeSchedule };
