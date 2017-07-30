let config = require("./config");

let express = require("express");
let app = express();
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(config.port);
