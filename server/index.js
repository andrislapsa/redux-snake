let path = require("path");
let express = require("express");
let http = require("http");
let socketIO = require("socket.io");

let webpack = require("webpack");
let config = require("./../webpack.config.js");

config.entry.unshift("webpack-hot-middleware/client");

let app = express();
let compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});


let server = http.createServer(app);
let io = socketIO(server);

server.listen(3000, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Listening at http://localhost:3000");
});


io.on("connection", (client) => {
    console.log("Client connectesd...");

    client.on("join", data => {
        console.log("Client joined", data);
    });

    client.on("snakeBody", data => {
        console.log("playerData received", data);
        io.emit("snakeBody", data);
    });

});
