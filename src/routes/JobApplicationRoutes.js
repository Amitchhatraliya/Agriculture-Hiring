const routes = require('express').Router();
const applicationController = require('../controllers/JobApplicationController');

// Submit application
routes.post('/', applicationController.createApplication);

// Get applications for a specific job
routes.get('/job/:jobId', applicationController.getApplicationsByJob);

// Get applications for a specific user
routes.get('/user/:userId', applicationController.getApplicationsByUser);

// Update application status
routes.patch('/:id', applicationController.updateApplicationStatus);

routes.put('/application/:id', applicationController.updateApplication); // general update
routes.delete('/application/:id', applicationController.deleteApplication);


module.exports = routes;