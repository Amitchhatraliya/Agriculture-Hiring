const routes = require('express').Router();
const workerController = require('../controllers/WorkerController');
routes.post("/addworker", workerController.addWorker);    
routes.get("/getworker",workerController.getWorker);
routes.post("/loginworker", workerController.loginWorker);
module.exports = routes;