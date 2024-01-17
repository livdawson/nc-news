const db = require("../db/connection")

exports.checkArticleIDexists = (article_id) => {
    return db.query(`
    SELECT * FROM articles 
    WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) return Promise.reject({status: 404, msg: 'article_id not found'})
    })
};

exports.checkCommentIDexists = (comment_id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE comment_id = $1
    `, [comment_id])
    .then(( { rows }) => {
        if(rows.length === 0) return Promise.reject({status: 404, msg: 'comment_id not found'})
    })
}