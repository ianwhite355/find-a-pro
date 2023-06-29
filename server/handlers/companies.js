"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const companyGet = async (request, response) => {
	const _id = Number(request.params._id);

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const company = await db.collection("companies").findOne({ _id });

		if (company) {
			response.status(200).json({ status: 200, data: company });
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

const companyPost = async (request, response) => {
	const { email, number, name, services, estimateProviders, ownersName } = request.body;

	if (!number || !name || !email) {
		return responseponse.status(400).json({
			status: 400,
			data: {
				name: name || "Missing first name",
				email: email || "Missing email",
				number: number || "Missing phone-number",
			},
		});
	}

	const client = new MongoClient(MONGO_URI, options);

	const newId = uuidv4();

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const companiesList = await db.collection("companies").find().toArray();

		const isEmailDuplicate = companiesList.some((companies) => companies.email === email);

		let data = null;

		if (!isEmailDuplicate) {
			data = { _id: newId, email: email, number: number, name: name, ownersName: ownersName, services: services, estimateProviders: estimateProviders };
		} else {
			response.status(409).json({ status: 409, message: "There is already am account with this email" });
			return;
		}

		const collection = await db.collection("companies").insertOne(data);

		response.status(200).json({ status: 200, data: data });
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

module.exports = {
	companyGet,
	companyPost,
};
