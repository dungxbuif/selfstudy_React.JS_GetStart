const { response } = require('express');
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
    let id = req.body.id;
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
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
};
