const apiRouter = require('express').Router();
const { getAllAvailableEndpoints } = require('../controllers/endpoints.controllers');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require("./topics-router");
const usersRouter = require('./users-router');

apiRouter.get('/', getAllAvailableEndpoints)

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;