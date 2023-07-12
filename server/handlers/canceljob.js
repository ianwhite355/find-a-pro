"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const deleteJob = async (request, response) => {

	const { userId, companyId, estimateId, exclusion } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

        const deleteEstimate =  await db.collection("estimates").updateOne({ _id: estimateId }, { $set: { estimateStatus: "cancelled"}});

		//just put the logic from modify schedule in here or part of it

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

        //need to delete the exclusion that matches inside of exclusions in the times collection, just wait for now

        if (deleteEstimate) {
            response.status(200).json({ status: 200, message: "estimate has been deleted" })
        } else {
            response.status(404).json({ status: 404, message: "error deleting data" })
        }

	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = {
	deleteJob,
};
