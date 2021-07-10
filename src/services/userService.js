const db = require('../models/index');
const bcrypt = require('bcryptjs');

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

module.exports = {
    handleUserogin: handleUserogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
};
