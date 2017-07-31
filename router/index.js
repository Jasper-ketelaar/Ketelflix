let express = require("express");
let movies = require("./movies")
let series = require("./series");
let search = require("./search");
let router = express.Router();

router.get("/", (req, res) => {
    res.render("blocks/welcome.pug", {
        home: true
    });
});

router.use("/movies", movies);
router.use("/tv", series);
router.use("/search", search);

module.exports = router;
