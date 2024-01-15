const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { internalServerErrors } = require("./errors");
const { getAllAvailableEndpoints } = require("./controllers/endpoints.controllers");
const app = express();

app.get('/api', getAllAvailableEndpoints)

app.get('/api/topics', getTopics);

app.use(internalServerErrors)

module.exports = app