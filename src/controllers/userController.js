const userService = require("../services/userService");

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!",
        });
    }

    let userData = await userService.handleUserogin(email, password);

    return res.status(200).json(userData);
};
module.exports = {
    handleLogin: handleLogin,
};
