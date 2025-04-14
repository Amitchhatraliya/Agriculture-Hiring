const routes = require('express').Router();
const employerController = require('../controllers/EmployerController');
routes.post("/addemployer", employerController.addEmployer); 
routes.get("/getemployer",employerController.getemployer);
routes.post("/loginemployer",employerController.loginEmployer)
module.exports = routes;