const routes = require('express').Router();
const companyController = require('../controllers/CompanyController');
routes.post("/addcompany", companyController.addCompany);  
routes.post("/getcompany",companyController.getcompany);  
routes.get("/getcompanybyuserid",companyController.getAllCompanyByUserId);
module.exports = routes;