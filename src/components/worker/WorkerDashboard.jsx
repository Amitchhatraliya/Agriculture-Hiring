import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileViews, setProfileViews] = useState(0);
  const [userId] = useState('123'); // Replace with actual user ID from auth

  // Fetch jobs and applications
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch jobs
      const jobsResponse = await axios.get('http://localhost:4000/job/getjob');
      setJobs(jobsResponse.data.data || []);
      
      // Fetch user's applications
      if (userId) {
        const appsResponse = await axios.get(`http://localhost:4000/jobapplication/user/${userId}`);
        setApplications(appsResponse.data || []);
      }
      
      setProfileViews(0); // Initialize profile views
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post('http://localhost:4000/jobapplication', {
        jobId,
        userId,
        status: 'Pending'
      });
      
      // Update applications state with the new application
      setApplications(prev => [...prev, response.data]);
      
      // Refresh jobs to get updated application counts
      const jobsResponse = await axios.get('http://localhost:4000/job/getjob');
      setJobs(jobsResponse.data.data || []);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  // Helper function to check if user has applied to a job
  const hasApplied = (jobId) => {
    return applications.some(app => {
      const appliedJobId = typeof app.jobId === 'object' ? app.jobId._id : app.jobId;
      return appliedJobId === jobId;
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Dashboard Overview</h2>
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <h3>Jobs Applied</h3>
                <p style={styles.statNumber}>{applications.length}</p>
              </div>
              <div style={styles.statCard}>
                <h3>Active Jobs</h3>
                <p style={styles.statNumber}>{jobs.length}</p>
              </div>
              <div style={styles.statCard}>
                <h3>Profile Views</h3>
                <p style={styles.statNumber}>{profileViews}</p>
              </div>
            </div>
            
            <h3 style={styles.sectionTitle}>Recent Applications</h3>
            {applications.length === 0 ? (
              <p style={styles.noDataText}>No applications yet. Browse jobs to apply.</p>
            ) : (
              <div style={styles.applicationsList}>
                {applications.slice(0, 3).map(app => (
                  <div key={app._id} style={styles.applicationCard}>
                    <h4 style={styles.jobTitle}>{app.jobId?.title || 'No title'}</h4>
                    <p style={styles.companyName}>{app.jobId?.companyName || 'Unknown company'}</p>
                    <div style={styles.applicationMeta}>
                      <span>Applied: {new Date(app.appliedDate || Date.now()).toLocaleDateString()}</span>
                      <span style={styles.statusBadge(app.status)}>{app.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'viewJobs':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Available Jobs</h2>
            {isLoading ? (
              <div style={styles.loadingContainer}>
                <p>Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <p style={styles.noDataText}>No jobs available at the moment. Please check back later.</p>
            ) : (
              <div style={styles.jobList}>
                {jobs.map(job => (
                  <div key={job._id} style={styles.jobCard}>
                    <div style={styles.jobHeader}>
                      <h3 style={styles.jobTitle}>{job.title || 'No title'}</h3>
                      <span style={styles.jobSalary}>{job.salaryRange || 'Salary not specified'}</span>
                    </div>
                    <p style={styles.companyName}>{job.companyName || 'Unknown company'} • {job.location || 'Location not specified'}</p>
                    <p style={styles.jobDescription}>{job.jobDescription || 'No description provided'}</p>
                    <div style={styles.jobFooter}>
                      <span style={styles.postedDate}>Status: {job.status || 'Unknown'}</span>
                      <button 
                        onClick={() => applyForJob(job._id)} 
                        style={styles.applyButton}
                        disabled={hasApplied(job._id)}
                      >
                        {hasApplied(job._id) ? 'Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'viewApplications':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Your Applications</h2>
            {applications.length === 0 ? (
              <p style={styles.noDataText}>You haven't applied to any jobs yet. Browse jobs to apply.</p>
            ) : (
              <div style={styles.applicationsTable}>
                <div style={styles.tableHeader}>
                  <span style={styles.headerItem}>Job Title</span>
                  <span style={styles.headerItem}>Company</span>
                  <span style={styles.headerItem}>Applied Date</span>
                  <span style={styles.headerItem}>Status</span>
                </div>
                {applications.map(app => (
                  <div key={app._id} style={styles.tableRow}>
                    <span style={styles.tableCell}>{app.jobId?.title || 'No title'}</span>
                    <span style={styles.tableCell}>{app.jobId?.companyName || 'Unknown company'}</span>
                    <span style={styles.tableCell}>{new Date(app.appliedDate || Date.now()).toLocaleDateString()}</span>
                    <span style={styles.tableCell}>
                      <span style={styles.statusBadge(app.status)}>{app.status}</span>
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
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h1 style={styles.logo}>JobFinder</h1>
        <nav style={styles.nav}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={activeTab === 'dashboard' ? styles.activeNavButton : styles.navButton}
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => setActiveTab('viewJobs')} 
            style={activeTab === 'viewJobs' ? styles.activeNavButton : styles.navButton}
          >
            View Jobs
          </button>
          <button 
            onClick={() => setActiveTab('viewApplications')} 
            style={activeTab === 'viewApplications' ? styles.activeNavButton : styles.navButton}
          >
            View Applications
          </button>
        </nav>
        <div style={styles.profileSection}>
          <div style={styles.profileIcon}>JS</div>
          <p style={styles.profileName}>Job Seeker</p>
        </div>
      </div>
      <div style={styles.mainContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

// CSS styles
const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#34495e',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: '22px',
    marginBottom: '40px',
    color: '#1abc9c',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navButton: {
    padding: '12px 15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#2c3e50'
    }
  },
  activeNavButton: {
    padding: '12px 15px',
    backgroundColor: '#1abc9c',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid #2c3e50'
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1abc9c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  profileName: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '500'
  },
  mainContent: {
    flex: '1',
    padding: '30px',
    backgroundColor: 'white',
    boxShadow: '0 0 15px rgba(0,0,0,0.05)'
  },
  tabContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  tabTitle: {
    color: '#2c3e50',
    marginBottom: '25px',
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
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1abc9c',
    margin: '10px 0 0'
  },
  sectionTitle: {
    color: '#2c3e50',
    margin: '30px 0 15px',
    fontSize: '18px',
    fontWeight: '600'
  },
  jobList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  jobTitle: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600'
  },
  jobSalary: {
    color: '#1abc9c',
    fontWeight: '600',
    fontSize: '15px'
  },
  companyName: {
    margin: '0 0 15px',
    color: '#7f8c8d',
    fontSize: '15px'
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
  postedDate: {
    color: '#95a5a6',
    fontSize: '13px'
  },
  applyButton: {
    padding: '8px 20px',
    backgroundColor: '#1abc9c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#16a085'
    },
    ':disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed'
    }
  },
  applicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  applicationCard: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    borderLeft: '4px solid #1abc9c'
  },
  applicationMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '14px',
    color: '#7f8c8d'
  },
  statusBadge: (status) => ({
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'Pending' ? '#f39c12' : 
                   status === 'Reviewed' ? '#3498db' : 
                   status === 'Rejected' ? '#e74c3c' : '#2ecc71',
    color: 'white'
  }),
  applicationsTable: {
    border: '1px solid #ecf0f1',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr 1fr',
    backgroundColor: '#34495e',
    color: 'white',
    padding: '12px 15px',
    fontWeight: '600',
    fontSize: '14px'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr 1fr',
    padding: '12px 15px',
    borderBottom: '1px solid #ecf0f1',
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
  tableCell: {
    fontSize: '14px'
  },
  noDataText: {
    color: '#7f8c8d',
    textAlign: 'center',
    padding: '20px'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  }
};

export default JobSeekerDashboard;