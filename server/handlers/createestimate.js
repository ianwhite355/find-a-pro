"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const createEstimate = async (request, response) => {
	// const { day, month, year, time } = request.body
	const { companyId, userId, estimateDate, estimateTime } = request.body;

	const client = new MongoClient(MONGO_URI, options);


	const newId = uuidv4();

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const estimates = await db.collection("estimates").find().toArray();

		const estimateDateTime = { 
			day: estimateDate.day,
			month: estimateDate.month,
			year: estimateDate.year,
			time: estimateTime,
		};

		const data = {
			_id: newId,
			companyId: companyId,
			userId: userId,
			estimateDate: estimateDate,
			estimateTime: estimateTime,
			workDate: null,
			estimateStatus: "pending",
			workComplete: false,
			price: null,
			paid: false,
			deposit: null,
			depositPaid: false,
		};

		const collection = await db.collection("estimates").insertOne(data);

		const companyInsert = await db.collection("companies").updateOne({ _id: companyId }, { $push: { estimates: newId } });

		const userInsert = await db.collection("users").updateOne({ _id: userId }, { $push: { estimates: newId } });

		const times = await db.collection("times").updateOne({ _id: companyId }, { $push: { exclusions: estimateDateTime }});

		if (!companyInsert) {
			response.status(404).json({ status: 404, message: "Company not found" });
			return;
		}

		if (!userInsert) {
			response.status(404).json({ status: 404, message: "Company not found" });
			return;
		}

		if (collection) {
			response.status(200).json({ status: 200, data: data });
		} else {
			response.status(200).json({ status: 200, message: "error posting the data" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

module.exports = { createEstimate };
