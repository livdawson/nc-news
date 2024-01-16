const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");
const { handleCustomErrors, handleSqlErrors, internalServerErrors } = require("./errors");
const { getAllAvailableEndpoints } = require("./controllers/endpoints.controllers");
const { getArticleByArticleID, getArticles } = require("./controllers/articles.controllers");
const { getCommentsByArticleID } = require("./controllers/comments.controllers");
const app = express();

app.get('/api', getAllAvailableEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleByArticleID)

app.get('/api/articles/:article_id/comments', getCommentsByArticleID)

app.use(handleCustomErrors)

app.use(handleSqlErrors)

app.use(internalServerErrors)

module.exports = app