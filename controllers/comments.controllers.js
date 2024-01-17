const {
  selectCommentsByArticleID,
  insertNewComment,
  removeComment,
} = require("../models/comments.models");
const { checkArticleIDexists, checkCommentIDexists } = require("../utils/utils");

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const selectCommentsByArticleIDQuery = selectCommentsByArticleID(article_id);
  const articleIDExistenceQuery = checkArticleIDexists(article_id);

  Promise.all([selectCommentsByArticleIDQuery, articleIDExistenceQuery])
    .then((response) => {
      const comments = response[0];
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
  const articleIDExistenceQuery = checkArticleIDexists(article_id);

  Promise.all([insertCommentQuery, articleIDExistenceQuery])
    .then((response) => {
        const newComment = response[0];
        res.status(201).send({ comment: newComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    const deleteCommentQuery = removeComment(comment_id)
    const commentIDExistenceQuery = checkCommentIDexists(comment_id)

    Promise.all([deleteCommentQuery, commentIDExistenceQuery])
    .then(() => {
        res.status(204).send()
    }).catch((err) => {
        next(err)
    })
}
