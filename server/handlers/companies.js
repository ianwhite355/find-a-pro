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
	const _id = request.params._id;

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


const companyGetNoPass = async (request, response) => {
	const { companyIds } = request.params;
  
	const client = new MongoClient(MONGO_URI, options);
  
	try {
	  await client.connect();
	  const db = client.db("findyourpro");
  
	  const company = await db
		.collection("companies")
		.findOne({ _id: companyIds }, { projection: { password: 0 } });
  
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
  
  

// const companyGetNoPass = async (request, response) => {
// 	const _id = request.params._id;

// 	const client = new MongoClient(MONGO_URI, options);

// 	try {
// 		await client.connect();
// 		const db = client.db("findyourpro");

// 		const company = await db.collection("companies").findOne({ _id }, { projection: { password: 0 } });

// 		if (company) {
// 			response.status(200).json({ status: 200, data: company });
// 		} else {
// 			response.status(404).json({ status: 404, message: "Company not found" });
// 		}
// 	} catch (error) {
// 		console.error(`Internal error: ${error.stack}`);
// 		response.status(500).json({ status: 500, error: error.message });
// 	} finally {
// 		client.close();
// 	}
// };

const timeSlotsGet = async (request, response) => {
	const _id = request.params._id;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();

		const db = client.db("findyourpro");

		const times = await db.collection("times").findOne({ _id });

		if (times) {
			response.status(200).json({ status: 200, data: times });
		} else {
			response.status(404).json({ status: 404, message: "time slots not found" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

const companyPost = async (request, response) => {
	const { email, password, number, name, services, estimateProviders, ownersName, image, logo, description } = request.body;

	if (!number || !name || !email) {
		return responseponse.status(400).json({
			status: 400,
			data: {
				name: name || "Missing name",
				email: email || "Missing email",
				password: password || "Missing password",
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

		let companyData = null;
		let timeData = null;

		if (!isEmailDuplicate) {
			companyData = {
				_id: newId,
				email: email,
				password: password,
				number: number,
				name: name,
				ownersName: ownersName,
				services: services,
				estimateProviders: estimateProviders,
				image: image,
				logo: logo,
				description: description,
			};
			timeData = {
				_id: newId,
				available: { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
				exclusions: [],
			};
		} else {
			response.status(409).json({ status: 409, message: "There is already am account with this email" });
			return;
		}

		const companyCollection = await db.collection("companies").insertOne(companyData);
		const timeCollection = await db.collection("times").insertOne(timeData);

		response.status(200).json({ status: 200, data: companyData });
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

module.exports = {
	companyGet,
	companyGetNoPass,
	companyPost,
	timeSlotsGet,
};
