const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { internalServerErrors } = require("./errors");
const app = express();

app.use(express.json())

app.get('/api/topics', getTopics);

app.use(internalServerErrors)

module.exports = app