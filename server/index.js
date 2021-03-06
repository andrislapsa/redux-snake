let path = require("path");
let express = require("express");
let http = require("http");

let webpack = require("webpack");
let config = require("./../webpack.config.js");

config.entry.unshift("webpack-hot-middleware/client");

let app = express();
let compiler = webpack(config);

import { createStore } from "redux";
import megaReducer from "./reducer";
import initialState from "./initialState";
import ticker from "./ticker"
import { createSocket, registerSocket } from "../src/socket/initServer";
import * as log from "./log";

const store = createStore(megaReducer, initialState);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});

let server = http.createServer(app),
    io = createSocket(server);

server.listen(3000, err => {
    if (err) {
        log.error(err, log.ERROR);
        return;
    }

    log.info("Listening at http://localhost:3000");
});


registerSocket(store, io);
ticker(store, io);
