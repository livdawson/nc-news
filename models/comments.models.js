const db = require("../db/connection")
    
exports.selectCommentsByArticleID = (article_id) => {
    return db.query(`
    SELECT * FROM comments 
    WHERE article_id = $1
    ORDER BY created_at DESC
    `, [article_id])
    .then((response) => {
        const { rows } = response
        return rows
    })
}

exports.insertNewComment = (article_id, username, body) => {
    return db.query(`SELECT username FROM users WHERE username = $1`, [username])
    .then((usernameRetrieved) => {
        const { rows } = usernameRetrieved;
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "username not found"})
        } else {
            return db.query(`
            INSERT INTO comments (article_id, author, body)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [article_id, rows[0].username, body])
        }
}).then((response) => {
        const { rows } = response;
        return rows[0];
    })
}
