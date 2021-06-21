import db from '../models';
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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}
