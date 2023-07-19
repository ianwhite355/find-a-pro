"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const addReview = async (request, response) => {
	const { companyId, userId, overallRating, serviceRating, qualityRating, description, userName, date } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	const _id = uuidv4();

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const company = await db.collection("companies").findOne({ _id: companyId });

		if (company && company.reviews.some((review) => review.userId === userId)) {
			response.status(400).json({ status: 400, message: "User already submitted a review for this company" });
			return;
		}

		const newReview = await db
			.collection("companies")
			.updateOne({ _id: companyId }, { $push: { reviews: { _id, userId, overallRating, serviceRating, qualityRating, description, userName, date } } });

		const userReview = await db
			.collection("users")
			.updateOne({ _id: userId }, { $push: { reviews: { _id, companyId, overallRating, serviceRating, qualityRating, description, userName, date } } });

		if (newReview.modifiedCount > 0 && userReview.modifiedCount > 0) {
			response.status(200).json({ status: 200, message: "review posted succesfully" });
		} else {
			response.status(404).json({ status: 404, message: "error modifying schedule" });
		}
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

const deleteReview = async (request, response) => {
	const { companyId, userId, rating, description, userName, date } = request.body;

	const client = new MongoClient(MONGO_URI, options);

	const _id = uuidv4();

	try {
		await client.connect();
		const db = client.db("findyourpro");

		const newReview = await db.collection("companies").updateOne({ _id: companyId }, { $push: { reviews: { _id, userId, rating, description, date } } });

		const userReview = await db
			.collection("users")
			.updateOne({ _id: userId }, { $push: { reviews: { _id, companyId, rating, description, userName, date } } });

		if (newReview.modifiedCount > 0 && userReview.modifiedCount > 0) {
			response.status(200).json({ status: 200, message: "schedule modified succesfully" });
		} else {
			response.status(404).json({ status: 404, message: "error modifying schedule" });
		}
	} catch (err) {
		(err) => console.log(err);
	} finally {
		client.close();
	}
};

module.exports = { addReview };
