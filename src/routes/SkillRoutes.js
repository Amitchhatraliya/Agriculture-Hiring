const routes = require('express').Router();
const skillController = require('../controllers/SkillController');
routes.post("/addskill", skillController.addSkill); 
routes.get("/getskill", skillController.getSkill);
module.exports = routes;