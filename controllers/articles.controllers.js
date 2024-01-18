const { selectArticleByArticleID, selectArticles, updateArticleVotes } = require("../models/articles.models");
const { checkArticleIDExists, checkTopicExists } = require("../utils/utils");

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
    const { topic, sort_by, order } = req.query;
    const selectArticlesQuery = selectArticles(topic, sort_by, order);

    const queries = [selectArticlesQuery];
    
    if (topic) {
        const topicExistenceQuery = checkTopicExists(topic);
        queries.push(topicExistenceQuery)
    }

    Promise.all(queries)
    .then((response) => {
        const articles = response[0]
        res.status(200).send({ articles })
    }).catch((err) => {
        next(err)
    })
}

exports.patchArticleVotes = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    const updateVotesQuery = updateArticleVotes(article_id, inc_votes);
    const articleIDExistenceQuery = checkArticleIDExists(article_id);

    Promise.all([updateVotesQuery, articleIDExistenceQuery, ])
    .then((response) => {
        const updatedArticle = response[0]
        res.status(200).send({article: updatedArticle})
    }).catch((err) => {
        next(err)
    })
}