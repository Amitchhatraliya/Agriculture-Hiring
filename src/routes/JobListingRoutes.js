const routes = require('express').Router();
const joblistingController = require('../controllers/JobListingController');
routes.post("/addjoblisting", joblistingController.addJobListing); 
routes.get("/getjoblisting",joblistingController.getJobListing);
module.exports = routes;