const db = require("../db/connection")

exports.selectArticleByArticleID = (article_id) => {
    return db.query(`
    SELECT * FROM articles 
    WHERE article_id = $1`,
    [article_id])
    .then((data) => {
        const { rows } = data;
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows[0]
    })
}