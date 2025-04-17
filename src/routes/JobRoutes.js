const routes = require('express').Router();
const jobController = require('../controllers/JobController');
routes.post("/addjob", jobController.addJob); 
routes.get("/getjob",jobController.getAllJobByJobId);
routes.get("/employer/:employerId", jobController.getJobsByEmployer);

module.exports = routes;
