const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');
let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', homeController.getHomePage);
   router.get('/about', homeController.getAboutPage);
   router.get('/crud', homeController.getCRUD);
   router.get('/get-crud', homeController.displayCRUD);
   router.get('/edit-crud', homeController.getEditCRUD);
   router.get('/delete-crud', homeController.deleteCRUD);

   router.post('/post-crud', homeController.postCRUD);
   router.post('/put-crud', homeController.putCRUD);
   //React
   router.post('/api/login', userController.handleLogin);
   router.get('/api/get-all-user', userController.handleGetAllUsers);
   router.post('/api/create-new-user', userController.handleCreateNewUsers);
   router.put('/api/update-user', userController.handleUpdateUser);
   router.delete('/api/delete-user', userController.handleDeleteUsers);

   router.get('/api/get-top-doctor-home', doctorController.getTopDoctorHome);
   router.get('/api/get-all-doctors', doctorController.getAllDoctors);
   router.post('/api/post-info-doctors', doctorController.postInfoDoctor);
   router.get('/api/get-detail-doctor', doctorController.getDetailDoctor);

   return app.use('/', router);
};

module.exports = initWebRoutes;
