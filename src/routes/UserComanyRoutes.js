const routes = require('express').Router();
const userCompanyController = require('../controllers/UserCompanyController');
routes.post("/addusercompany", userCompanyController.addUserCompany);
routes.get("/getusercompany",userCompanyController.getUserCompany);
module.exports = routes;