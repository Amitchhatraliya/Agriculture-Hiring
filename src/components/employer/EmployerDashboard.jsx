import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      if (!newJob.companyName || !newJob.title || !newJob.jobDescription || !newJob.location || !newJob.salaryRange) {
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
    // Clear any user-related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Redirect to login page
    navigate('/login1');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
  return (
    <div style={styles.tabContent}>
      <h2 style={styles.tabTitle}>Dashboard Overview</h2>
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total Jobs Posted</h3>
          <p style={styles.statNumber}>{jobs.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Applicants</h3>
          <p style={styles.statNumber}>
            {jobs.reduce((total, job) => total + (job.applicationCount || 0), 0)}
          </p>
        </div>
        <div style={styles.statCard}>
          <h3>Active Listings</h3>
          <p style={styles.statNumber}>
            {jobs.filter(job => job.status === 'Active').length}
          </p>
        </div>
      </div>
    </div>
  );
      case 'addJob':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Add New Job</h2>
            {error && <div style={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleAddJob} style={styles.jobForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name*</label>
                <input
                  type="text"
                  name="companyName"
                  value={newJob.companyName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter company name"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title*</label>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter job title"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={newJob.jobDescription}
                  onChange={handleInputChange}
                  style={{ ...styles.input, height: '120px' }}
                  required
                  placeholder="Enter detailed job description"
                />
              </div>
              
              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="e.g. New York"
                  />
                </div>
                
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Salary Range*</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={newJob.salaryRange}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="e.g. $50,000 - $70,000"
                  />
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Status*</label>
                  <select
                    name="status"
                    value={newJob.status}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Employment Type*</label>
                  <select
                    name="employmentType"
                    value={newJob.employmentType}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>
        );
      case 'editJob':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Edit Job</h2>
            {error && <div style={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleUpdateJob} style={styles.jobForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name*</label>
                <input
                  type="text"
                  name="companyName"
                  value={editingJob.companyName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter company name"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title*</label>
                <input
                  type="text"
                  name="title"
                  value={editingJob.title}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Enter job title"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={editingJob.jobDescription}
                  onChange={handleInputChange}
                  style={{ ...styles.input, height: '120px' }}
                  required
                  placeholder="Enter detailed job description"
                />
              </div>
              
              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={editingJob.location}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="e.g. New York"
                  />
                </div>
                
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Salary Range*</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={editingJob.salaryRange}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="e.g. $50,000 - $70,000"
                  />
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Status*</label>
                  <select
                    name="status"
                    value={editingJob.status}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Employment Type*</label>
                  <select
                    name="employmentType"
                    value={editingJob.employmentType}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
              </div>
              
              <div style={styles.formRow}>
                <button 
                  type="submit" 
                  style={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Job'}
                </button>
                <button 
                  type="button" 
                  style={{...styles.submitButton, backgroundColor: '#95a5a6'}}
                  onClick={() => {
                    setEditingJob(null);
                    setActiveTab('viewJobs');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );
      case 'viewJobs':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Posted Jobs</h2>
            {isLoading ? (
              <div style={styles.loading}>Loading jobs...</div>
            ) : error ? (
              <div style={styles.errorMessage}>{error}</div>
            ) : jobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              <div style={styles.jobList}>
                {jobs.map(job => (
                  <div key={job._id} style={styles.jobCard}>
                    <div style={styles.jobCardHeader}>
                      <h3 style={styles.jobTitle}>{job.title}</h3>
                      <span style={styles.jobStatus(job.status)}>{job.status}</span>
                    </div>
                    <p style={styles.jobCompany}>{job.companyName}</p>
                    <div style={styles.jobMeta}>
                      <span>{job.location}</span>
                      <span>{job.employmentType}</span>
                      <span>{job.salaryRange}</span>
                    </div>
                    <p style={styles.jobDescription}>{job.jobDescription}</p>
                    <div style={styles.jobFooter}>
                      <span>Applicants: {job.applicationCount || 0}</span>
                      <div style={styles.jobActions}>
                        <button 
                          onClick={() => fetchApplicants(job._id)} 
                          style={styles.viewApplicantsButton}
                        >
                          Applicants
                        </button>
                        <button 
                          onClick={() => startEditingJob(job)} 
                          style={styles.editButton}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteJob(job._id)} 
                          style={styles.deleteButton}
                        >
                          Delete
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
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Job Applicants</h2>
            {isLoading ? (
              <div style={styles.loading}>Loading applicants...</div>
            ) : error ? (
              <div style={styles.errorMessage}>{error}</div>
            ) : applicants.length === 0 ? (
              <p>No applicants yet.</p>
            ) : (
              <div style={styles.applicantList}>
                <div style={styles.applicantHeader}>
                  <span style={styles.headerItem}>Applicant ID</span>
                  <span style={styles.headerItem}>Status</span>
                  <span style={styles.headerItem}>Applied Date</span>
                  <span style={styles.headerItem}>Actions</span>
                </div>
                {applicants.map(applicant => (
                  <div key={applicant._id} style={styles.applicantRow}>
                    <span style={styles.applicantData}>{applicant.userId}</span>
                    <span style={styles.applicantData}>
                      <span style={styles.statusBadge(applicant.status)}>
                        {applicant.status}
                      </span>
                    </span>
                    <span style={styles.applicantData}>
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </span>
                    <span style={styles.applicantData}>
                      <button 
                        style={styles.actionButton}
                        onClick={() => updateApplicationStatus(applicant._id, 'Reviewed')}
                      >
                        Mark Reviewed
                      </button>
                      <button 
                        style={{...styles.actionButton, backgroundColor: '#e74c3c'}}
                        onClick={() => updateApplicationStatus(applicant._id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button 
              onClick={() => setActiveTab('viewJobs')} 
              style={styles.backButton}
            >
              Back to Jobs
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h1 style={styles.logo}>JobConnect</h1>
        <nav style={styles.nav}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={activeTab === 'dashboard' ? styles.activeNavButton : styles.navButton}
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => setActiveTab('addJob')} 
            style={activeTab === 'addJob' ? styles.activeNavButton : styles.navButton}
          >
            Add Job
          </button>
          <button 
            onClick={() => setActiveTab('viewJobs')} 
            style={activeTab === 'viewJobs' ? styles.activeNavButton : styles.navButton}
          >
            View Jobs
          </button>
          <button 
            onClick={() => selectedJobId && setActiveTab('viewApplicants')} 
            style={activeTab === 'viewApplicants' ? styles.activeNavButton : styles.navButton}
            disabled={!selectedJobId}
          >
            View Applicants
          </button>
        </nav>
        <div style={styles.profileSection}>
          <div style={styles.profileIcon}>JP</div>
          <div>
            <p style={styles.profileName}>Job Provider</p>
            <button 
              onClick={handleLogout} 
              style={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div style={styles.mainContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

const styles = {
  jobActions: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '8px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  deleteButton: {
    padding: '8px 15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  },
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f5'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: '24px',
    marginBottom: '40px',
    color: '#3498db',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  navButton: {
    padding: '12px 15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#34495e'
    }
  },
  activeNavButton: {
    padding: '12px 15px',
    backgroundColor: '#3498db',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid #34495e'
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  profileName: {
    margin: '0',
    fontSize: '14px',
    marginBottom: '5px'
  },
  logoutButton: {
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: '1px solid #e74c3c',
    color: '#e74c3c',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#e74c3c',
      color: 'white'
    }
  },
  mainContent: {
    flex: '1',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px 0 0 0',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  tabContent: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  tabTitle: {
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: '600'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0 0'
  },
  jobForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '800px'
  },
  formRow: {
    display: 'flex',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '14px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db'
    }
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    },
    marginTop: '10px',
    ':disabled': {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed'
    }
  },
  jobList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    }
  },
  jobCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  jobTitle: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '18px'
  },
  jobCompany: {
    margin: '0 0 10px',
    color: '#3498db',
    fontSize: '15px',
    fontWeight: '500'
  },
  jobStatus: (status) => ({
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'Active' ? '#2ecc71' : status === 'Closed' ? '#e74c3c' : '#95a5a6',
    color: 'white'
  }),
  jobMeta: {
    margin: '0 0 10px',
    color: '#7f8c8d',
    fontSize: '14px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  jobDescription: {
    margin: '0 0 15px',
    color: '#34495e',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  jobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewApplicantsButton: {
    padding: '8px 15px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#27ae60'
    }
  },
  applicantList: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  applicantHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1.5fr',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '12px 15px',
    fontWeight: '600'
  },
  applicantRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1.5fr',
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
    backgroundColor: 'white',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  headerItem: {
    fontSize: '14px'
  },
  applicantData: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px'
  },
  statusBadge: (status) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'Pending' ? '#f39c12' : 
                   status === 'Reviewed' ? '#3498db' : 
                   status === 'Rejected' ? '#e74c3c' : '#2ecc71',
    color: 'white'
  }),
  actionButton: {
    padding: '6px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    marginRight: '8px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#7f8c8d'
    }
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: '#fadbd8',
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #f5b7b1'
  },
  loading: {
    color: '#3498db',
    textAlign: 'center',
    padding: '20px'
  }
};

export default JobProviderDashboard;