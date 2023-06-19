"use strict";

const express = require("express");
const morgan = require("morgan");
// const { windowWashing, poolCleaning, carCleaning } = require("./data/datatemp");
const { windowWashingGet, windowWashingPost } = require("./handlers/windowwashing");
const { poolCleaningGet, poolCleaningPost } = require("./handlers/poolcleaning");
const { paintingGet, paintingPost } = require("./handlers/painting");
const { addUser } = require("./handlers/addUser")
const { allDataGet } = require("./handlers/alldata");
const { login } = require("./handlers/login");

const app = express();
const PORT = 8000;

app.use(morgan("dev"));
app.use(express.json());

// app.get("/api/:id", (req, res) => {
//     const id = req.params.id;
//     const data = getDataForId(id);

//     if (data) {
//         res.json(data);
//     } else {
//         res.status(404).json({ error: "Data not found" });
//     }

// });


app.get("/api/windowWashing", windowWashingGet)

app.post("/api/windowWashing", windowWashingPost)

app.get("/api/poolCleaning", poolCleaningGet)

app.post("/api/poolCleaning", poolCleaningPost)

app.get("/api/painting", paintingGet)

app.post("/api/painting", paintingPost)

app.get("/api/alldata", allDataGet)

app.post("/api/add-user", addUser)

app.post('/login', login);


app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});