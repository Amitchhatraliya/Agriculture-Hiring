const Application = require("../models/JobApplication")
const Job = require('../models/JobModel');

// Create a new application
// controllers/JobApplicationController.js
exports.createApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    
    // Check if application already exists
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      jobId,
      userId,
      status: 'Pending'
    });
    
    const savedApplication = await application.save();
    
    // Update the job to include this application
    await Job.findByIdAndUpdate(jobId, { 
      $inc: { applicationCount: 1 },
      $push: { applications: savedApplication._id }
    });
    
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get applications by job ID
exports.getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications by user ID
exports.getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate('jobId', 'title companyName location salaryRange status');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const updatedApplications = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!updatedApplications) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(updatedApplications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// General update application by ID
exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body, // allows updating multiple fields
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Decrement application count on the associated job
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicationCount: -1 } });

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
