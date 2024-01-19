const articlesRouter = require('express').Router();
const { getArticles, getArticleByArticleID, patchArticleVotes } = require('../controllers/articles.controllers');
const { getCommentsByArticleID, postNewComment } = require('../controllers/comments.controllers');

articlesRouter.get('/', getArticles)

articlesRouter
    .route('/:article_id')
    .get(getArticleByArticleID)
    .patch(patchArticleVotes)

articlesRouter
    .route('/:article_id/comments')
    .get(getCommentsByArticleID)
    .post(postNewComment)

module.exports = articlesRouter