let request = require('request');

let movies = "https://www.rottentomatoes.com/browse/top-dvd-streaming";
let moviere = /\"title\":\"(.[^\"]*)/g;

let series = "http://www.imdb.com/search/title?title_type=tv_series";
let seriesre = /\href=\"\/title\/(.[^\/]*)/g;

let getPopularMovies = function(callback) {
    request(movies, (err, res, html) => {
        if (!err) {
            let movies = moviere.execAll(html);
            let titles = [];
            for (let key in movies) {
                titles.push(movies[key][1]);
            }
            callback(titles);
        }
    });
}

let getPopularSeries = function(callback) {
    request(series, (err, res, html) => {
        if (!err) {
            let series = seriesre.execAll(html);
            let ids = [];
            for (let key in series) {
                ids.push(series[key][1]);
            }
            let unique = ids.filter((v, i, a) => a.indexOf(v) === i);
            callback(unique);
        }
    });
}

getPopularSeries(console.log);

RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

module.exports = {
    getPopularMovies: getPopularMovies,
    getPopularSeries: getPopularSeries
}
