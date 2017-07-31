let config = require("./config");

let express = require("express");
let router = require("./router");
let session = require("express-session");

let app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.set("view options", {
    layout: "base"
});

app.use(session({
    secret: 'pirating movies is illegal'
}));

app.use(router);

app.listen(config.port);
