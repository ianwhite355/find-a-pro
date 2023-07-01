const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options ={
    useNewUrlParser:true,
    useUnifiedTopology: true,
}

const allDataGet = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("findyourpro");
        const collection = db.collection("companies");
        const allCompanies = await collection.find({}, { projection: { password: 0 } }).toArray();

        res.status(200).json({ status: 200, data: allCompanies });

    }   catch (error) {
		console.error(`Internal error: ${error.stack}`);
		response.status(500).json({ status: 500, error: error.message });
	} finally {
		client.close();
	}
}

module.exports = {
    allDataGet
};