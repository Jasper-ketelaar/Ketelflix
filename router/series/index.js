let express = require("express");
let imdb = require("imdb-api")
let config = require("../../config");
let popular = require("../../lib/popular");
var Promise = require('promise');
let router = express.Router();

router.get("/", (req, res) => {
    if (req.session.series) {
        res.render("blocks/thumbnails.pug", {
            data: req.session.series
        });
    }

    let calls = [];
    popular.getPopularSeries((ids) => {
        var promises = ids.map((id) => {
            return new Promise(function(resolve, reject) {
                imdb.getById(id, {
                        apiKey: config.omdb_key
                    }).then(resolve)
                    .catch(resolve);
            });
        });

        Promise.all(promises).then((result) => {
            req.session.series = result.filter((el) => el !== "" &&
                el.type !== "movie");
            res.render("blocks/thumbnails.pug", {
                data: req.session.series,
                type: "serie"
            });
        }).catch(console.log);

    });

});

/*router.get("/:id", (req, res) => {
    let movie = req.params.id;
    imdb.getById(movie, {
        apiKey: config.omdb_key
    }).then(data => {
        res.render("blocks/movie.pug", {
            data: data
        });
    });
});*/

module.exports = router;
