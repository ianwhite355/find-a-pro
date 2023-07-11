"use strict";

const express = require("express");
const morgan = require("morgan");
const { companyGet, companyPost, timeSlotsGet, companyGetNoPass } = require("./handlers/companies");
const { addUser, getUser, getUserNoPass } = require("./handlers/addUser")
const { allDataGet } = require("./handlers/alldata");
const { loginForUser, loginForBusiness } = require("./handlers/login");
const { getEstimatesByUser, getEstimatesByCompany } = require("./handlers/getestimates");
const { createEstimate } = require("./handlers/createestimate");
const { exclusionsPost } = require("./handlers/exclusions");
const { deleteJob } = require("./handlers/canceljob");
const { modifyEstimate } = require("./handlers/editestimate");
const { changeSchedule, cancelExclusion, changeExclusions } = require("./handlers/modifyschedule");

const app = express();
const PORT = 8000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/company/:_id", companyGet)

app.get("/api/companygetnopass/:companyIds", companyGetNoPass)

app.post("/api/companyposting", companyPost)

app.get("/api/alldata", allDataGet)

app.post("/api/add-user", addUser)

app.get("/api/getuser/:userId", getUserNoPass )

app.post('/login/user', loginForUser);

app.post("/login/business", loginForBusiness)

app.post("/api/estimate", createEstimate)

app.put("/api/estimatesmodify", modifyEstimate)

app.post("/api/exclusions/:_id", exclusionsPost)

app.get("/api/getestimatesbyuser/:userId", getEstimatesByUser)

app.get("/api/getestimatescompany/:companyId", getEstimatesByCompany)

app.get("/api/timeslots/:_id", timeSlotsGet)

app.post("/api/deletejob", deleteJob)

app.post("/api/schedulechanges", changeSchedule)

app.post("/api/addexclusion", changeExclusions)

app.post("/api/deleteexclusion", cancelExclusion)

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});