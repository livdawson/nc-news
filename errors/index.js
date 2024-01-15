exports.internalServerErrors = (err, req, res, next) => {
    console.log(err)
    res.send(500).send({msg: 'Internal Server Error'})
}