const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");
const route = require("./route");
require('dotenv').config();
const connectDB = require("./config/connectDB");
const app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
route(app);

connectDB;

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server running on http://dungxbuif-localhost:" + port)
})
