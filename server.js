var path = require("path");
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

var webpack = require("webpack");
var config = require("./webpack.config");

config.entry.unshift("webpack-hot-middleware/client");

var app = express();
var compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});


var server = http.createServer(app);
var io = socketIO(server);

server.listen(3000, "localhost", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3000");
});



io.on("connection", function(client) {
    console.log("Client connected...");

    client.on("join", function(data) {
        console.log("Client joined", data);
    });

    client.on("snakeBody", function(data) {
        console.log("snakeBody received", data);
    });

});

