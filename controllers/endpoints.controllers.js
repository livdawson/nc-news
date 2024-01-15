const { fetchEndpoints } = require("../models/endpoints.models")

exports.getAllAvailableEndpoints = (req, res, next) => {
    fetchEndpoints().then((endpoints) => {
        res.status(200).send({ endpoints })
    }).catch((err) => {
        next(err)
    })
}