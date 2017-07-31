let express = require("express");
let imdb = require("imdb-api")
let config = require("../../config");
let popular = require("../../lib/popular");
var Promise = require('promise');
let router = express.Router();

router.get("/", (req, res) => {
    if (req.session.movies) {
        res.render("blocks/thumbnails.pug", {
            data: req.session.movies,
            type: "movie"
        });
    }

    let calls = [];
    popular.getPopularMovies((names) => {
        var promises = names.map((name) => {
            return new Promise(function(resolve, reject) {
                imdb.get(name, {
                    apiKey: config.omdb_key
                }).then((response) => {
                    if (response.type === "movie") {
                        resolve(response);
                    } else {
                        resolve("");
                    }
                }).catch(resolve);
            });
        });

        Promise.all(promises).then((result) => {
            req.session.movies = result.filter((el) => el !== "" &&
                el.type === "movie");
            res.render("blocks/thumbnails.pug", {
                data: req.session.movies,
                type: "movie"
            });
        }).catch(console.log);

    });

});

router.get("/:id", (req, res) => {
    let movie = req.params.id;
    imdb.getById(movie, {
        apiKey: config.omdb_key
    }).then(data => {
        res.render("blocks/movie.pug", {
            data: data
        });
    });
});

module.exports = router;
