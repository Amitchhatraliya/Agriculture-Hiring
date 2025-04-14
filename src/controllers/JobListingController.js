const jobListingModel = require("../models/JobListingModel");

const addJobListing = async (req, res) => {
  try {
    const savedJobListing = await jobListingModel.create(req.body);
    res.status(201).json({
      message: "JobListing added successfully",
      data: savedJobListing,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getJobListing = async (req, res) => {
    try {
      const createdJobListing = await jobListingModel.find()
      res.status(200).json({
        message: "Job Listing found",
        data: createdJobListing,
      });
    } catch (err) {
      res.status(500).json({
        message: "JobListing not found",
      });
    }
  };

module.exports = { addJobListing, getJobListing }