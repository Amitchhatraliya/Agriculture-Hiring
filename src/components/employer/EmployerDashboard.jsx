import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    if (activeTab === 'viewJobs') {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/job/getjob');
      setJobs(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!newJob.companyName || !newJob.title || !newJob.jobDescription || !newJob.location || !newJob.salaryRange) {
        throw new Error('Please fill all required fields');
      }
  
      const jobToPost = {
        ...newJob,
        status: newJob.status || 'Active',
        employmentType: newJob.employmentType || 'Full-Time'
      };
  
      const response = await axios.post('http://localhost:8000/job/addjob', jobToPost, {
        validateStatus: function (status) {
          return status < 500;
        }
      });
  
      if (response.status >= 400) {
        throw new Error(response.data.message || 'Failed to add job');
      }
  
      setJobs([...jobs, response.data.data]);
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

  const viewApplicants = (jobId) => {
    const mockApplicants = [
      { id: 1, name: 'John Doe', email: 'john@example.com', jobId, status: 'Pending' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', jobId, status: 'Reviewed' }
    ];
    setApplicants(mockApplicants);
    setActiveTab('viewApplicants');
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
                <p style={styles.statNumber}>{applicants.length}</p>
              </div>
              <div style={styles.statCard}>
                <h3>Active Listings</h3>
                <p style={styles.statNumber}>{jobs.filter(job => job.status === 'Active').length}</p>
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
                    <option value="Seasonal">Seasonal</option>
                    <option value="Contract">Contract</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
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
                  <div key={job._id || job.id} style={styles.jobCard}>
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
                    <button 
                      onClick={() => viewApplicants(job._id || job.id)} 
                      style={styles.viewApplicantsButton}
                    >
                      View Applicants
                    </button>
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
            {applicants.length === 0 ? (
              <p>No applicants yet.</p>
            ) : (
              <div style={styles.applicantList}>
                <div style={styles.applicantHeader}>
                  <span style={styles.headerItem}>Name</span>
                  <span style={styles.headerItem}>Email</span>
                  <span style={styles.headerItem}>Status</span>
                  <span style={styles.headerItem}>Actions</span>
                </div>
                {applicants.map(applicant => (
                  <div key={applicant.id} style={styles.applicantRow}>
                    <span style={styles.applicantData}>{applicant.name}</span>
                    <span style={styles.applicantData}>{applicant.email}</span>
                    <span style={styles.applicantData}>
                      <span style={styles.statusBadge(applicant.status)}>
                        {applicant.status}
                      </span>
                    </span>
                    <span style={styles.applicantData}>
                      <button style={styles.actionButton}>View Resume</button>
                      <button style={styles.actionButton}>Contact</button>
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
            onClick={() => setActiveTab('viewApplicants')} 
            style={activeTab === 'viewApplicants' ? styles.activeNavButton : styles.navButton}
          >
            View Applicants
          </button>
        </nav>
        <div style={styles.profileSection}>
          <div style={styles.profileIcon}>JP</div>
          <p style={styles.profileName}>Job Provider</p>
        </div>
      </div>
      <div style={styles.mainContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

const styles = {
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
    fontSize: '14px'
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
    backgroundColor: status === 'Pending' ? '#f39c12' : '#2ecc71',
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