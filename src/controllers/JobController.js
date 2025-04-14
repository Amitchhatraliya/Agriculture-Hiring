const jobModel = require("../models/JobModel");

const addJob = async (req, res) => {
  try {
    const savedJob = await jobModel.create(req.body);
    res.status(201).json({
      message: "Job added successfully",
      data: savedJob,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllJobByJobId = async (req, res) => {
    try {
      const job = await jobModel.find()
      res.status(200).json({
        message: "Job found",
        data: job,
      });
    } catch (err) {
      res.status(500).json({
        message: "Job not found",
      });
    }
  };

module.exports = { addJob, getAllJobByJobId };