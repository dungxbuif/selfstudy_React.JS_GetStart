const db = require('../models');
const CRUDService = require('../services/CRUDService')
const getHomePage = async (req, res) => {
    try{
        const data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch (e) {
        console.log(e);
    }
        
}

const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

const getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('posted crud')
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}
