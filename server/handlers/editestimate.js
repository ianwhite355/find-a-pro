"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const modifyEstimate = async (request, response) => {
	// const { day, month, year, time } = request.body
	const { estimateId, estimateStatus, price, paid, deposit, depositPaid } = request.body;

	const client = new MongoClient(MONGO_URI, options);


	try {
		await client.connect();
		const db = client.db("findyourpro");

		const updateData = {
			// companyId: companyId,
			// userId: userId,
			// estimateDate: estimateDateTime,
			// workDate: null,
			// estimateStatus: estimateStatus,
			// price: price,
			// paid: paid,
			// deposit: deposit,
			// depositPaid: depositPaid,
		};

        if (estimateStatus) {
            updateData.estimateStatus = estimateStatus;
        }

        if (price) {
            updateData.price = price;
        }

        if (paid) {
            updateData.paid = paid;
        }

        if (deposit) {
            updateData.deposit = deposit;
        }

        if (depositPaid) {
            updateData.depositPaid = depositPaid;
        }

		const collection = await db.collection("estimates").updateOne({ _id: estimateId}, { $set: updateData })


		if (collection) {
			response.status(200).json({ status: 200, data: updateData });
		} else {
			response.status(200).json({ status: 404, message: "error modifying the estimate" });
		}
	} catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
};

module.exports = { modifyEstimate };
