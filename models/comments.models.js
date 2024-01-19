const db = require("../db/connection")
    
exports.selectCommentsByArticleID = (article_id) => {
    return db.query(`
    SELECT * FROM comments 
    WHERE article_id = $1
    ORDER BY created_at DESC
    `, [article_id])
    .then(({ rows }) => {
        return rows
    })
}

exports.insertNewComment = (article_id, username, body) => {
    if (username === undefined || body === undefined) return Promise.reject ({ status: 400, msg: 'Bad Request'})
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
}).then(({ rows }) => {
        return rows[0];
    })
};

exports.removeComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1 
    RETURNING *
    `, [comment_id])
    .then(({ rows }) => {
        return rows;
    })
}

exports.updateCommentVotes = (comment_id, inc_votes) => {
    return db.query(`
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *
    `, [inc_votes, comment_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "comment_id not found"})
        }
        return rows[0]
    })
}
