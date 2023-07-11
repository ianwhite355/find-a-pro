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

	console.log(exclusion);

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		//this will delete one and only one exclusion

		const schedule = await db.collection("times").findOne({ _id: companyId });
		if (!schedule) {
			response.status(404).json({ status: 404, message: "schedule not found" });
			return;
		}

		const exclusions = schedule.exclusions;

		const updatedExclusions = exclusions.filter((item, index) => {
			if (item.day === exclusion.day && item.month === exclusion.month && item.year === exclusion.year && item.time === exclusion.time) {
				exclusions.splice(index, 1);
				return false;
			}
			return true;
		});

		const modifySchedule = await db.collection("times").updateOne({ _id: companyId }, { $set: { exclusions: exclusions } });

		if (modifySchedule.matchedCount === 0) {
			response.status(404).json({ status: 404, message: "error modifying schedule" });
		} else {
			response.status(200).json({ status: 200, message: "schedule modified successfully", exclusions: exclusions });
		}
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { changeSchedule, changeExclusions, cancelExclusion };
