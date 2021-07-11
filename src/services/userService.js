const db = require('../models/index');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handleUserogin = async (email, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let isUser = await checkUserEmail(email);
         let userData = {
            code: 0,
            data: {
               email,
            },
         };

         if (isUser) {
            // Ktra Lại 1 lần nữa nhỡ có người xóa khi mình đã ktra đc  email
            isUser = await checkUserEmail(email);
            if (isUser) {
               let userPassword = isUser.password;
               let roleId = isUser.roleId;
               const check = bcrypt.compareSync(password, userPassword);
               if (check) {
                  userData.message = `OK`;
                  userData.data.roleId = roleId;
               } else {
                  userData.code = 3;
                  userData.message = `Wrong password`;
               }
            } else {
               userData.code = 2;
               userData.data = {};
               userData.message = `User's not found`;
            }

            resolve(userData);
         } else {
            userData.code = 1;
            userData.data = {};
            userData.message = `Your email doesn't exist in the system. Please try again`;
         }

         resolve(userData);
      } catch (e) {
         reject(e);
      }
   });
};

const checkUserEmail = (email) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { email },
         });
         if (user) resolve(user);
         else resolve(false);
      } catch (e) {
         reject(e);
      }
   });
};

const getAllUsers = (userId) => {
   return new Promise(async (req, res) => {
      try {
         let;
      } catch (e) {}
   });
   return new Promise(async (resolve, reject) => {
      try {
         let user = '';
         if (userId === 'ALL') {
            user = await db.User.findAll({
               attributes: {
                  exclude: ['password'],
               },
            });
         }
         if (userId && userId !== 'ALL') {
            user = await db.User.findOne({
               where: { id: userId },
               attributes: {
                  exclude: ['password'],
               },
            });
         }
         resolve(user);
      } catch (e) {
         reject(e);
      }
   });
};

const createNewUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let checkEmail = await checkUserEmail(data.email);
         if (checkEmail)
            resolve({
               code: 1,
               message: 'Your email has already existed',
            });

         let hashPasswordFromBcrypt = await hashUserPassword(data.password);
         await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
         });
         resolve({
            code: 0,
            message: 'OK',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const deleteUser = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id },
            raw: false,
         });
         if (!user)
            resolve({
               code: 2,
               message: `The user isn't exist`,
            });
         await user.destroy();
         resolve({
            code: 0,
            message: `Deleted successfully!!!`,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const updateUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.id) {
            resolve({
               code: 2,
               message: 'Missing required parameters',
            });
         }
         let user = await db.User.findOne({
            where: { id: data.id },
            raw: false,
         });

         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = db.User.findAll();
            resolve({
               code: 0,
               message: 'Updated successfully!!!',
            });
         } else {
            resolve({
               code: 1,
               message: `User's not found`,
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   handleUserogin,
   checkUserEmail,
   getAllUsers,
   createNewUser,
   deleteUser,
   updateUser,
};
