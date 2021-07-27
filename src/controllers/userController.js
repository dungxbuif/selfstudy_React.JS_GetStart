const userService = require('../services/userService');

const handleLogin = async (req, res) => {
   let email = req.body.email;
   let password = req.body.password;

   if (!email || !password) {
      return res.status(500).json({
         code: 1,
         message: 'Missing input parameter!',
      });
   }

   let userData = await userService.handleUserogin(email, password);

   return res.status(200).json(userData);
};

const handleGetAllUsers = async (req, res) => {
   let id = req.query.id;
   let users = await userService.getAllUsers(id);

   if (!id) {
      return res.status(500).json({
         code: 1,
         message: 'Missing required parameters!!!',
         data: [],
      });
   }

   return res.status(200).json({
      code: 0,
      message: 'OK',
      data: users,
   });
};

const handleCreateNewUsers = async (req, res) => {
   let message = await userService.createNewUser(req.body);
   return res.status(200).json(message);
};

const handleUpdateUser = async (req, res) => {
   let data = req.body;
   let message = await userService.updateUser(data);
   return res.status(200).json(message);
};

const handleDeleteUsers = async (req, res) => {
   if (!req.body.id)
      return res.status(500).json({
         code: 1,
         message: 'Missing required parameters',
      });

   let message = await userService.deleteUser(req.body.id);
   return res.status(200).json(message);
};
module.exports = {
   handleLogin,
   handleGetAllUsers,
   handleCreateNewUsers,
   handleUpdateUser,
   handleDeleteUsers,
};
