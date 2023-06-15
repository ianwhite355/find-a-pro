const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options ={
    useNewUrlParser:true,
    useUnifiedTopology: true,
}

const allDataGet = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
    
        await client.connect();
    
        const db = client.db("companies");
        const collectionNames = await db.listCollections().toArray();
        const collections = collectionNames.map((col) => col.name);
    
        const allDocuments = [];
    
        for (const collectionName of collections) {
            const collection = db.collection(collectionName);
            const documents = await collection.find({}).toArray();
            allDocuments.push(...documents);
        }
    
        res.status(200).json({ status: 200, data: allDocuments });
    

        client.close();

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    allDataGet
};