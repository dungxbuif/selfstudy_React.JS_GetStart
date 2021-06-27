const express = require("express");
const homeController = require("../controllers/homeController");

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    return app.use("/", router);
}

module.exports = initWebRoutes;