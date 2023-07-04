"use strict";

const express = require("express");
const morgan = require("morgan");
const { companyGet, companyPost, timeSlotsGet, companyGetNoPass } = require("./handlers/companies");
const { addUser } = require("./handlers/addUser")
const { allDataGet } = require("./handlers/alldata");
const { loginForUser, loginForBusiness } = require("./handlers/login");
const { getEstimatesByUser, getEstimatesByCompany } = require("./handlers/getestimates");
const { createEstimate } = require("./handlers/createestimate");
const { exclusionsPost } = require("./handlers/exclusions");

const app = express();
const PORT = 8000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/company/:_id", companyGet)

app.get("/api/companygetnopass/:companyIds", companyGetNoPass)

app.post("/api/companyposting", companyPost)

app.get("/api/alldata", allDataGet)

app.post("/api/add-user", addUser)

app.post('/login/user', loginForUser);

app.post("/login/business", loginForBusiness)

app.post("/api/estimate", createEstimate)

app.post("/api/exclusions/:_id", exclusionsPost)

app.get("/api/getestimatesbyuser/:userId", getEstimatesByUser)

app.get("/api/getestimatescompany/:companyId", getEstimatesByCompany)

app.get("/api/timeslots/:_id", timeSlotsGet)

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});