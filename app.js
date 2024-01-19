const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { handleCustomErrors, handleSqlErrors, internalServerErrors } = require("./errors");

app.use(express.json())

app.use('/api', apiRouter)

app.use(handleCustomErrors)

app.use(handleSqlErrors)

app.use(internalServerErrors)

module.exports = app