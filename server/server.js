"use strict";

const express = require("express");
const morgan = require("morgan");
const { windowWashing, poolCleaning, carCleaning } = require("./data/datatemp");

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


app.get("/api/windowWashing", (req, res) => {
    res.status(200).json({ status: 200, data: windowWashing });
});

app.get("/api/poolCleaning", (req, res) => {
    res.status(200).json({ status: 200, data: poolCleaning });
});

app.get("/api/carCleaning", (req, res) => {
    res.status(200).json({ status: 200, data: carCleaning });
});


app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});