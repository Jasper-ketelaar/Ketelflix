let express = require("express");
let imdb = require("imdb-api")
let config = require("../../config");
let popular = require("../../lib/popular");
var Promise = require('promise');
let router = express.Router();

router.get("/:query", (req, res) => {
    let query = req.params.query;
    imdb.search({
        title: query
    }, {
        apiKey: config.omdb_key
    }).then((result) => {
        res.render("blocks/thumbnails", {
            data: result.results,
            message: "Search results for '" + query + "'"
        });
    }).catch((err) => {
        console.log(err);
        res.render("blocks/404.pug", {
            message: "No results"
        });
    });
});

module.exports = router;
