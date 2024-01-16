const { selectCommentsByArticleID } = require("../models/comments.models");
const { checkArticleIDexists } = require("../utils/utils");

exports.getCommentsByArticleID = (req, res, next) => {
    const { article_id } = req.params;
    const selectCommentsByArticleIDQuery = selectCommentsByArticleID(article_id)
    const articleIDExistenceQuery = checkArticleIDexists(article_id)
    
    Promise.all([selectCommentsByArticleIDQuery, articleIDExistenceQuery])
    .then((response) => {
        const comments = response[0]
        res.status(200).send({ comments })
    }).catch((err) => {
        next(err)
    })
}