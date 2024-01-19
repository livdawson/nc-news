const {
  selectCommentsByArticleID,
  insertNewComment,
  removeComment,
  updateCommentVotes,
} = require("../models/comments.models");
const { checkArticleIDExists } = require("../utils/utils");

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const selectCommentsByArticleIDQuery = selectCommentsByArticleID(article_id);
  const articleIDExistenceQuery = checkArticleIDExists(article_id);

  Promise.all([selectCommentsByArticleIDQuery, articleIDExistenceQuery])
    .then((queryResults) => {
      const comments = queryResults[0];
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const insertCommentQuery = insertNewComment(article_id, username, body);
  const articleIDExistenceQuery = checkArticleIDExists(article_id);

  Promise.all([insertCommentQuery, articleIDExistenceQuery])
  .then((queryResults) => {
        const newComment = queryResults[0];
        res.status(201).send({ comment: newComment });
  })
  .catch((err) => {
      next(err);
  });
};

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentVotes(comment_id, inc_votes)
  .then((updatedComment) => {
    res.status(200).send({comment: updatedComment})
  })
  .catch((err) => {
    next(err)
  })
}

