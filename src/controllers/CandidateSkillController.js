const candidateSkillModel = require("../models/CandidateSkillModel");

const addCandidateSkill = async (req, res) => {
  try {
    const savedCandidateSkill = await candidateSkillModel.create(req.body);
    res.status(201).json({
      message: "Canidadte Skill added successfully",
      data: savedCandidateSkill,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCandidateSkillbySkillId = async (req, res) => {
    try {
      const createdCandidateSkill = await candidateSkillModel.find();
      res.status(200).json({
        message: "Candidate Skill found",
        data: createdCandidateSkill,
      });
    } catch (err) {
      res.status(500).json({
        message: "Candidate Skill not found",
      });
    }
  };

module.exports = { addCandidateSkill , getCandidateSkillbySkillId};