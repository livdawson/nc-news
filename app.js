const express = require("express");
const cors = require('cors');
const app = express();
const apiRouter = require("./routes/api-router");
const { handleCustomErrors, handleSqlErrors, internalServerErrors } = require("./errors");

app.use(cors());

app.use(express.json())

app.use('/api', apiRouter)

app.use(handleCustomErrors)

app.use(handleSqlErrors)

app.use(internalServerErrors)

module.exports = app