const {query} = require('express');
const doctorService = require('../services/doctorService');

const getTopDoctorHome = async (req, res) => {
   let limit = 10;
   if (req.query.limit && req.query.limit !== 'undefined')
      limit = +req.query.limit;
   try {
      let response = await doctorService.getTopDoctorHome(limit);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: -1,
         message: 'Error from server',
      });
   }
};

// const handleGetAllUsers = async (req, res) => {
//    let id = req.query.id;
//    let users = await userService.getAllUsers(id);

//    if (!id) {
//       return res.status(500).json({
//          code: 1,
//          message: 'Missing required parameters!!!',
//          data: [],
//       });
//    }

//    return res.status(200).json({
//       code: 0,
//       message: 'OK',
//       data: users,
//    });
// };

// const handleCreateNewUsers = async (req, res) => {
//    let message = await userService.createNewUser(req.body);
//    return res.status(200).json(message);
// };

// const handleUpdateUser = async (req, res) => {
//    let data = req.body;
//    let message = await userService.updateUser(data);
//    return res.status(200).json(message);
// };

// const handleDeleteUsers = async (req, res) => {
//    if (!req.body.id)
//       return res.status(500).json({
//          code: 1,
//          message: 'Missing required parameters',
//       });

//    let message = await userService.deleteUser(req.body.id);
//    return res.status(200).json(message);
// };
module.exports = {
   getTopDoctorHome,
   // handleGetAllUsers,
   // handleCreateNewUsers,
   // handleUpdateUser,
   // handleDeleteUsers,
};
