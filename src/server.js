import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import route from "./route";
require('dotenv').config();
import connectDB from "./config/connectDB";
const app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
route(app);

connectDB;

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port : " + port)
})
