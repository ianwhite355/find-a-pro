

"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (request, response) => {

  const { firstName, lastName, email, password, address, phoneNumber } = request.body;

  if(!address || !firstName || !lastName || !email){
    return response.status(400).json({status: 400, data: { address: address || "Missing address", firstName: firstName || "Missing first name", lastName: lastName || "Missing last name", email: email || "Missing email", phoneNumber: phoneNumber || "Missing phone-number",  password: password || "Missing passsword"}})
  }

  const client = new MongoClient(MONGO_URI, options);

  try {

    await client.connect();
    const db = client.db("Users");

    const resultGet = await db.collection("users").find().toArray();


    let _id = uuidv4();
    let isDuplicate = resultGet.find(users => users._id === _id)
    while(isDuplicate){
      _id = uuidv4()
      isDuplicate = resultGet.find(users => users._id === _id)
    }


    const isEmailDuplicate = resultGet.some(users => users.email === email);

    let data = null;
    if(!isEmailDuplicate){
      data = { "_id": _id, "firstName": firstName, "lastName": lastName, "email": email,"address": address, "phoneNumber": phoneNumber, "password": password};
    } else {
      response.status(409).json({status: 409, message: "There is already am account with this email" })
    }

    const resultInsert = await db.collection("users").insertOne(data);

    resultInsert
      ? response.status(201).json({status: 201, data: resultInsert})
      : response.status(400).json({ status: 400, message:"Bad request", data: data});
    
  } catch (err) {
    (err) => console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { addUser };