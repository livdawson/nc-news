const db = require("../db/connection")

exports.selectArticleByArticleID = (article_id) => {
    return db.query(`
    SELECT * FROM articles 
    WHERE article_id = $1`,
    [article_id])
    .then((response) => {
        const { rows } = response;
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows[0]
    })
}

exports.selectArticles = () => {
    const commentCount = ` 
    CAST(
        (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) 
    AS INTEGER)
    `
    const sqlQuery = `
    SELECT author, title, article_id, topic, created_at, votes, article_img_url, ${commentCount} AS comment_count FROM articles
    ORDER BY created_at DESC
    `
    return db.query(sqlQuery)
    .then((response) => {
        const { rows } = response;
        return rows;
    })
}
