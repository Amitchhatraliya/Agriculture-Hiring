const routes = require('express').Router();
const JobSkillController = require('../controllers/JobSkillController');
routes.post("/addjobskill", JobSkillController.addJobSkill); 
routes.get("/getjobskill",JobSkillController.getJobSkill);
module.exports = routes;