import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/landing/css/employer.css';

const JobProviderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    companyName: '',
    title: '',
    jobDescription: '',
    location: '',
    salaryRange: '',
    status: 'Active',
    employmentType: 'Full-Time'
  });

  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'viewJobs') {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/job/getjob');
      setJobs(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplicants = async (jobId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/job/${jobId}/applications`);
      setApplicants(response.data.data.applications || []);
      setSelectedJobId(jobId);
      setActiveTab('viewApplicants');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applicants');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingJob) {
      setEditingJob(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewJob(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!newJob.companyName || !newJob.title || !newJob.jobDescription || 
          !newJob.location || !newJob.salaryRange) {
        throw new Error('Please fill all required fields');
      }

      const jobData = {
        ...newJob,
        employerId: "680062bfd0afc78d7ad930d2" // Replace with actual employer ID
      };

      const response = await axios.post('http://localhost:4000/job/addjob', jobData);

      setJobs(prevJobs => [...prevJobs, { ...response.data.data, applicationCount: 0 }]);
      setNewJob({
        companyName: '',
        title: '',
        jobDescription: '',
        location: '',
        salaryRange: '',
        status: 'Active',
        employmentType: 'Full-Time'
      });
      setActiveTab('viewJobs');
    } catch (err) {
      setError(err.message || 'Failed to add job');
      console.error('Error adding job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!editingJob.companyName || !editingJob.title || !editingJob.jobDescription || 
          !editingJob.location || !editingJob.salaryRange) {
        throw new Error('Please fill all required fields');
      }
  
      const response = await axios.put(
        `http://localhost:4000/job/${editingJob._id}`,
        editingJob
      );
  
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === editingJob._id ? { ...response.data.data, applicationCount: job.applicationCount } : job
        )
      );
      setEditingJob(null);
      setActiveTab('viewJobs');
    } catch (err) {
      setError(err.message || 'Failed to update job');
      console.error('Error updating job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/job/${jobId}`);
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingJob = (job) => {
    setEditingJob({ ...job });
    setActiveTab('editJob');
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      await axios.patch(`http://localhost:4000/jobapplication/${applicationId}`, {
        status: newStatus
      });
      
      if (selectedJobId) {
        fetchApplicants(selectedJobId);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login1');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="tab-content">
            <h2 className="tab-title">Dashboard Overview</h2>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3>Total Jobs Posted</h3>
                <p className="stat-number">{jobs.length}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Total Applicants</h3>
                <p className="stat-number">
                  {jobs.reduce((total, job) => total + (job.applicationCount || 0), 0)}
                </p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Active Listings</h3>
                <p className="stat-number">
                  {jobs.filter(job => job.status === 'Active').length}
                </p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Recent Activity</h3>
                <p className="stat-number">
                  {jobs.length > 0 ? 'Active' : 'None'}
                </p>
              </div>
            </div>
            
            <div className="recent-jobs-section">
              <h3>Recent Job Postings</h3>
              {jobs.slice(0, 3).map(job => (
                <div key={job._id} className="recent-job-card">
                  <div className="recent-job-header">
                    <h4>{job.title}</h4>
                    <span className={`job-status status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="recent-job-company">{job.companyName}</p>
                  <div className="recent-job-meta">
                    <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                    <span><i className="fas fa-clock"></i> {job.employmentType}</span>
                    <span><i className="fas fa-money-bill-wave"></i> {job.salaryRange}</span>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && <p className="no-data">No recent job postings</p>}
            </div>
          </div>
        );
      
      case 'addJob':
        return (
          <div className="tab-content">
            <h2 className="tab-title">Add New Job</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAddJob} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name*</label>
                  <input
                    type="text"
                    name="companyName"
                    value={newJob.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Job Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter job title"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={newJob.jobDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter detailed job description"
                  rows="5"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Ahmedabad, Gujarat"
                  />
                </div>
                
                <div className="form-group">
                  <label>Salary Range*</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={newJob.salaryRange}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 900/- per day or 25000/-"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status*</label>
                  <select
                    name="status"
                    value={newJob.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Employment Type*</label>
                  <select
                    name="employmentType"
                    value={newJob.employmentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Posting...</> : <><i className="fas fa-plus"></i> Post Job</>}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setActiveTab('viewJobs')}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </form>
          </div>
        );
      
      case 'editJob':
        return (
          <div className="tab-content">
            <h2 className="tab-title">Edit Job</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleUpdateJob} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name*</label>
                  <input
                    type="text"
                    name="companyName"
                    value={editingJob.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Job Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={editingJob.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter job title"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={editingJob.jobDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter detailed job description"
                  rows="5"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={editingJob.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. New York"
                  />
                </div>
                
                <div className="form-group">
                  <label>Salary Range*</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={editingJob.salaryRange}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. $50,000 - $70,000"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status*</label>
                  <select
                    name="status"
                    value={editingJob.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Employment Type*</label>
                  <select
                    name="employmentType"
                    value={editingJob.employmentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Updating...</> : <><i className="fas fa-save"></i> Update Job</>}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingJob(null);
                    setActiveTab('viewJobs');
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </form>
          </div>
        );
      
      case 'viewJobs':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2 className="tab-title">Posted Jobs</h2>
              <button 
                onClick={() => setActiveTab('addJob')} 
                className="btn btn-primary"
              >
                <i className="fas fa-plus"></i> Add New Job
              </button>
            </div>
            
            {isLoading ? (
              <div className="loading">
                <i className="fas fa-spinner fa-spin"></i> Loading jobs...
              </div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : jobs.length === 0 ? (
              <div className="no-jobs">
                <i className="fas fa-briefcase"></i>
                <p>No jobs posted yet.</p>
                <button 
                  onClick={() => setActiveTab('addJob')} 
                  className="btn btn-primary"
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className="job-list">
                {jobs.map(job => (
                  <div key={job._id} className="job-card">
                    <div className="job-card-header">
                      <h3 className="job-title">{job.title}</h3>
                      <span className={`job-status status-${job.status.toLowerCase()}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="job-company">
                      <i className="fas fa-building"></i> {job.companyName}
                    </p>
                    <div className="job-meta">
                      <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                      <span><i className="fas fa-clock"></i> {job.employmentType}</span>
                      <span><i className="fas fa-money-bill-wave"></i> {job.salaryRange}</span>
                    </div>
                    <p className="job-description">{job.jobDescription}</p>
                    <div className="job-footer">
                      <span className="applicants-count">
                        <i className="fas fa-users"></i> {job.applicationCount || 0} Applicants
                      </span>
                      <div className="job-actions">
                        <button 
                          onClick={() => fetchApplicants(job._id)} 
                          className="btn btn-view-applicants"
                        >
                          <i className="fas fa-user-friends"></i> View Applicants
                        </button>
                        <button 
                          onClick={() => startEditingJob(job)} 
                          className="btn btn-edit"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteJob(job._id)} 
                          className="btn btn-delete"
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'viewApplicants':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h2 className="tab-title">Job Applicants</h2>
              <button 
                onClick={() => setActiveTab('viewJobs')} 
                className="btn btn-secondary"
              >
                <i className="fas fa-arrow-left"></i> Back to Jobs
              </button>
            </div>
            
            {isLoading ? (
              <div className="loading">
                <i className="fas fa-spinner fa-spin"></i> Loading applicants...
              </div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : applicants.length === 0 ? (
              <div className="no-applicants">
                <i className="fas fa-user-friends"></i>
                <p>No applicants for this job yet.</p>
              </div>
            ) : (
              <div className="applicant-list-container">
                <div className="applicant-list-header">
                  <span>Applicant Name</span>
                  <span>Status</span>
                  <span>Applied Date</span>
                  <span>Actions</span>
                </div>
                {applicants.map(applicant => (
                  <div key={applicant._id} className="applicant-row">
                    <span className="applicant-data">
                      <i className="fas fa-user"></i> {applicant.userId || 'N/A'}
                    </span>
                    <span className="applicant-data">
                      <span className={`status-badge status-${applicant.status.toLowerCase()}`}>
                        {applicant.status}
                      </span>
                    </span>
                    <span className="applicant-data">
                      <i className="fas fa-calendar-alt"></i> {new Date(applicant.appliedDate).toLocaleDateString()}
                    </span>
                    <span className="applicant-actions">
                      <button 
                        className="btn btn-sm btn-reviewed"
                        onClick={() => updateApplicationStatus(applicant._id, 'Reviewed')}
                      >
                        <i className="fas fa-check-circle"></i> Reviewed
                      </button>
                      <button 
                        className="btn btn-sm btn-rejected"
                        onClick={() => updateApplicationStatus(applicant._id, 'Rejected')}
                      >
                        <i className="fas fa-times-circle"></i> Reject
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            <i className="fas fa-handshake"></i> JobConnect
          </h1>
          <p className="role-badge">Job Provider</p>
        </div>
        
        <nav className="nav-menu">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('addJob')} 
            className={`nav-button ${activeTab === 'addJob' ? 'active' : ''}`}
          >
            <i className="fas fa-plus-circle"></i> Add Job
          </button>
          <button 
            onClick={() => setActiveTab('viewJobs')} 
            className={`nav-button ${activeTab === 'viewJobs' ? 'active' : ''}`}
          >
            <i className="fas fa-briefcase"></i> View Jobs
          </button>
          <button 
            onClick={() => selectedJobId && setActiveTab('viewApplicants')} 
            className={`nav-button ${activeTab === 'viewApplicants' ? 'active' : ''}`}
            disabled={!selectedJobId}
          >
            <i className="fas fa-user-friends"></i> View Applicants
          </button>
        </nav>
        
        <div className="profile-section">
          <div className="profile-info">
            <div className="profile-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <div>
              <p className="profile-name">Job Provider</p>
              <p className="profile-email">provider@jobconnect.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="logout-button"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      
      <div className="main-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default JobProviderDashboard;