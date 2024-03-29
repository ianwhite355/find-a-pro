"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const getEstimatesByCompany = async (request, response) => {
	const { companyId } = request.params;

	const client = new MongoClient(MONGO_URI, options);

    // const stringCompanyId = JSON.parse(companyId)

    // console.log(stringCompanyId)

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const estimate = await db.collection("estimates").find({ companyId: companyId }).toArray();

		if (estimate) {
			response.status(200).json({ status: 200, data: estimate });
		} else {
			response.status(404).json({ status: 404, message: "estimate not found" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

const getEstimatesByUser = async (request, response) => {
	const { userId } = request.params;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const estimate = await db.collection("estimates").find({ userId: userId }).toArray();

		if (estimate) {
			response.status(200).json({ status: 200, data: estimate });
		} else {
			response.status(404).json({ status: 404, message: "estimate not found" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

module.exports = { getEstimatesByCompany, getEstimatesByUser };
