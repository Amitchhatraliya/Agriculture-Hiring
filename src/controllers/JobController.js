const jobModel = require("../models/JobModel");
const Application = require("../models/JobApplication");

exports.addJob = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.employerId) {
      return res.status(400).json({ 
        message: "employerId is required",
        success: false 
      });
    }

    // Initialize application count and array
    const jobData = {
      ...req.body,
      applicationCount: 0,
      applications: []
    };

    const savedJob = await jobModel.create(jobData);
    res.status(201).json({
      success: true,
      message: "Job added successfully",
      data: savedJob,
    });
  } catch (err) {
    // Handle validation errors specifically
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: "Validation Error",
        errors: err.errors 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.getAllJobByJobId = async (req, res) => {
  try {
    // Populate applications data when fetching jobs
    const jobs = await jobModel.find().populate({
      path: 'applications',
      select: 'userId status appliedDate'
    });
    
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve jobs: " + err.message
    });
  }
};

exports.getJobsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;
    // Populate applications data for employer-specific jobs
    const jobs = await jobModel.find({ employerId }).populate({
      path: 'applications',
      select: 'userId status appliedDate'
    });

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

exports.deleteJob = async (req, res) => {
  try {
    // First find the job to get applications
    const job = await jobModel.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    // Delete all associated applications
    await Application.deleteMany({ jobId: req.params.id });

    // Then delete the job
    await jobModel.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true,
      message: 'Job and associated applications deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const updatedJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('applications');
    
    if (!updatedJob) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }
    
    res.json({
      success: true,
      data: updatedJob
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// New method to get job with applications
exports.getJobWithApplications = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id)
      .populate({
        path: 'applications',
        select: 'userId status appliedDate',
        options: { sort: { appliedDate: -1 } }
      });
    
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedJob = await jobModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};