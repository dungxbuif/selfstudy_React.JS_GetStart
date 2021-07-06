const express = require("express");
const homeController = require("../controllers/homeController");

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/post-crud', homeController.postCRUD);

    router.post('/put-crud', homeController.putCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;