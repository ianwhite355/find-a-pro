"use strict";

const express = require("express");
const morgan = require("morgan");
// const { windowWashing, poolCleaning, carCleaning } = require("./data/datatemp");
const { windowWashingGet, windowWashingPost } = require("./data/windowwashing");
const { poolCleaningGet, poolCleaningPost } = require("./data/poolcleaning");
const { paintingGet, paintingPost } = require("./data/painting");

const { allDataGet } = require("./data/alldata");

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

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});