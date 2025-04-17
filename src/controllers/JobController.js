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

  const getJobsByEmployer = async (req, res) => {
    try {
      const { employerId } = req.params;
      const jobs = await jobModel.find({ employerId });
  
      res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };

module.exports = { addJob, getAllJobByJobId , getJobsByEmployer };