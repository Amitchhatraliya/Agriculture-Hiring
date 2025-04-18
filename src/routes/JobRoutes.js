const routes = require('express').Router();
const jobController = require('../controllers/JobController');

// Job CRUD routes
routes.post("/addjob", jobController.addJob); 
routes.get("/getjob", jobController.getAllJobByJobId);
routes.get("/employer/:employerId", jobController.getJobsByEmployer);
routes.get("/:id/applications", jobController.getJobWithApplications); // New route
routes.put('/:id', jobController.updateJob);

// Job management routes
routes.delete('/:id', jobController.deleteJob);
routes.patch('/:id/status', jobController.updateJobStatus);

module.exports = routes;