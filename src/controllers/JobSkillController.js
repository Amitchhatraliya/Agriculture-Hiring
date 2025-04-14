
const jobSkillModel = require("../models/JobSkillModel");

const addJobSkill = async (req, res) => {
  try {
    const savedJobSkill = await jobSkillModel.create(req.body);
    res.status(201).json({
      message: "Job Skill added successfully",
      data: savedJobSkill,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getJobSkill = async (req, res) => {
    try {
      const jobSkill = await jobSkillModel.find()
      res.status(200).json({
        message: "Job Skill found",
        data: jobSkill,
      });
    } catch (err) {
      res.status(500).json({
        message: "Job Skill not found",
      });
    }
  };


module.exports = { addJobSkill, getJobSkill };