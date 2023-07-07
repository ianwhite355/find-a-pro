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
	//if needed
	const { userId, companyId, estimateId } = request.body;
	//if needed
	const { somethingElse } = request.params;

	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db("findyourpro");

		// const userEsimateDelete = await db.collection("users").updateOne({ _id: userId },{ $pull: { estimates: estimateId } });

        // const companyEstimateDelete = await db.collection("companies").updateOne({ _id: companyId }, { $pull: { estimates: estimateId }})
		
        const deleteEstimate =  await db.collection("estimates").updateOne({ _id: estimateId }, { $set: { estimateStatus: "cancelled"}});

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
