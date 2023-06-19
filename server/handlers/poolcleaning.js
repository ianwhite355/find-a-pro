
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options ={
    useNewUrlParser:true,
    useUnifiedTopology: true,
}

const poolCleaningGet = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("companies");
    
        const collection = db.collection("poolCleaning");
    
        const documents = await collection.find().toArray();
    
        res.status(200).json({ status:200, data: documents});

        client.close();

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const poolCleaningPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("companies");

        const collection = db.collection("poolCleaning");

        const newDocument = req.body;

        const result = await collection.insertOne(newDocument);

        res.status(201).json({ status: 201, data: result });

        client.close();
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    poolCleaningGet,
    poolCleaningPost,
};