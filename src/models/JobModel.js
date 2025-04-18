// models/JobModel.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salaryRange: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Draft'],
    default: 'Active'
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Seasonal'],
    default: 'Full-Time'
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);