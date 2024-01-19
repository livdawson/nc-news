const db = require("../db/connection")

exports.selectArticleByArticleID = (article_id) => {
    return db.query(`
    SELECT *, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count
    FROM articles 
    WHERE article_id = $1`,
    [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "article_id not found"})
        }
        return rows[0]
    })
}

exports.selectArticles = (topic, sort_by = "created_at", order = "desc") => {
    const queryValues = [];
    const validSortByQueries = ["created_at", "article_id", "title", "topic", "author", "body", "votes", "article_img_url"]
    const validOrderQueries = ["asc", "desc"]

    if (!validSortByQueries.includes(sort_by) || !validOrderQueries.includes(order)) {
        return Promise.reject({status: 400, msg: "Bad Request"})
    }

    let sqlQuery = `
    SELECT author, title, article_id, topic, created_at, votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles 
    `
    if (topic !== undefined) {
        sqlQuery += ` WHERE topic = $1 `
        queryValues.push(topic)
    }

    sqlQuery += ` ORDER BY ${sort_by} ${order} `
    
    return db.query(sqlQuery, queryValues)
    .then((response) => {
        const { rows } = response;
        return rows;
    })
}

exports.updateArticleVotes = (article_id, inc_votes) => {
    const sqlQuery = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *
    `
    return db.query(sqlQuery, [inc_votes, article_id])
    .then((response) => {
        const { rows } = response;
        return rows[0];
    })
}
