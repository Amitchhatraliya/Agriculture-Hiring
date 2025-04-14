const routes = require('express').Router();
const candidateSkillController = require('../controllers/CandidateSkillController');
routes.post("/addcandidateskill", candidateSkillController.addCandidateSkill);    
routes.get("/getallcandidateskill",candidateSkillController.getCandidateSkillbySkillId)
module.exports = routes;