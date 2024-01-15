const fs = require("fs/promises")

exports.fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8')
    .then((fileContents) => {
        const endpoints = JSON.parse(fileContents);
        return endpoints;
    })
}