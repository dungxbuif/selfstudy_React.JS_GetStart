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

const displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}

const getEditCRUD = async (req, res) => {
    let id = req.query.id;
    if(id){
        let userData =  await CRUDService.getUserById(id);
        return res.render('editCRUD.ejs',{
            data: userData
        })
    } else {
        return res.send("Can't find the user");
    }
}

const putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateCRUD(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers,
    });
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}
