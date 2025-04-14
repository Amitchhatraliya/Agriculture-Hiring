const routes = require('express').Router();
const jobApplicationController = require('../controllers/JobApplicationController');
routes.post("/addjobapplication", jobApplicationController.addJobApplication); 
routes.post("/addjobapplicationwithfile", jobApplicationController.addJobApplicationWithFile); 
routes.get("/getalljobapplication",jobApplicationController.getAllJobApplication);
routes.get("/getalljobapplicationwithfile", jobApplicationController.getAllJobApplicationWithFile);
module.exports = routes;