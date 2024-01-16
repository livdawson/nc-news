const { selectArticleByArticleID, selectArticles } = require("../models/articles.models")

exports.getArticleByArticleID = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleByArticleID(article_id)
    .then((article) => {
        res.status(200).send({ article })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send({ articles })
    }).catch((err) => {
        next(err)
    })
}