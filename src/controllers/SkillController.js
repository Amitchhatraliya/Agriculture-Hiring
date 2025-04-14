const skillModel = require("../models/SkillModel");

const addSkill = async (req, res) => {
  try {
    const savedSkill = await skillModel.create(req.body);
    res.status(201).json({
      message: "Skill added successfully",
      data: savedSkill,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSkill = async (req, res) => {
    try {
      const createdSkills = await skillModel.find();
      res.status(200).json({
        message: "Skill Found",
        data: createdSkills,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = { addSkill, getSkill}