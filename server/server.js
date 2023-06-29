"use strict";

const express = require("express");
const morgan = require("morgan");
const { companyGet, companyPost } = require("./handlers/companies");
const { addUser } = require("./handlers/addUser")
const { allDataGet } = require("./handlers/alldata");
const { login } = require("./handlers/login");
const { getEstimates, getEstimatesByUser, getEstimatesByCompany } = require("./handlers/getestimates");
const { createEstimate } = require("./handlers/createestimate");

const app = express();
const PORT = 8000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/company/:id", companyGet)

app.post("/api/companyposting", companyPost)

app.get("/api/alldata", allDataGet)

app.post("/api/add-user", addUser)

app.post('/login', login);

app.post("/api/estimate", createEstimate)

app.get("/api/getestimatesbyuser/:userId", getEstimatesByUser)

app.get("/api/getestimatescompany/:companyId", getEstimatesByCompany)

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});