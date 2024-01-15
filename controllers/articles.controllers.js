const { selectArticleByArticleID } = require("../models/articles.models")

exports.getArticleByArticleID = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleByArticleID(article_id)
    .then((article) => {
        res.status(200).send({ article })
    }).catch((err) => {
        next(err)
    })
}