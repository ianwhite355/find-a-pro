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
	const { companyId, schedule } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const modifySchedule = await db.collection("times").updateOne({ _id: companyId }, { $set: { available: schedule } });

		if (modifySchedule.matchedCount === 0) {
			response.status(404).json({ status: 404, message: "error modifying schedule" });
		} else {
			response.status(200).json({ status: 200, message: "schedule modified succesfully" });
		}
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

const changeExclusions = async (request, response) => {
	const { companyId, exclusion } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		//this is so it takes the array and makes it seperate, but I would be running a loop over this so is that fine?

		for (const exclusions of exclusion) {
			const modifySchedule = await db.collection("times").updateOne({ _id: companyId }, { $push: { exclusions: exclusions } });
		}

		// if (modifySchedule) {
		response.status(200).json({ status: 200, message: "schedule modified succesfully" });

		// } else {
		// 	response.status(404).json({ status: 404, message: "error modifying schedule"})
		// }
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

const cancelExclusion = async (request, response) => {
	const { companyId, exclusion } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		//fix this so it does not delete the same matching ones

		const modifySchedule = await db.collection("times").updateOne({ _id: companyId }, { $pull: { exclusions: exclusion } });

		if (modifySchedule.matchedCount === 0) {
			response.status(404).json({ status: 404, message: "error modifying schedule" });
		} else {
			response.status(200).json({ status: 200, message: "schedule modified succesfully" });
		}
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { changeSchedule, changeExclusions, cancelExclusion };
