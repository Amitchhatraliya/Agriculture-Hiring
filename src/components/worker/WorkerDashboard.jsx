import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/landing/css/worker.css';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileViews, setProfileViews] = useState(0);
  const [userId] = useState('123'); // Replace with actual user ID from auth
  const [searchTerm, setSearchTerm] = useState('');

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
      
      // Simulate profile views (in a real app, this would come from the backend)
      setProfileViews(Math.floor(Math.random() * 100));
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
      
      setApplications(prev => [...prev, response.data]);
      
      const jobsResponse = await axios.get('http://localhost:4000/job/getjob');
      setJobs(jobsResponse.data.data || []);
      
      // Show success notification
      alert('Application submitted successfully!');
    } catch (error) {
      console.error("Error applying for job:", error);
      alert('Failed to apply for job. Please try again.');
    }
  };

  const hasApplied = (jobId) => {
    return applications.some(app => {
      if (!app.jobId) return false;
      const appliedJobId = typeof app.jobId === 'object' ? app.jobId._id : app.jobId;
      return appliedJobId === jobId;
    });
  };

  const deleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await axios.delete(`http://localhost:4000/jobapplication/application/${applicationId}`);
        const appsResponse = await axios.get(`http://localhost:4000/jobapplication/user/${userId}`);
        setApplications(appsResponse.data || []);
        alert('Application withdrawn successfully');
      } catch (error) {
        console.error("Error deleting application:", error);
        alert('Failed to withdraw application');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app => 
    app.jobId?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobId?.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="tab-content">
            <h2 className="tab-title">Dashboard Overview</h2>
            <div className="stats-container">
              <div className="stat-card primary">
                <h3>Jobs Applied</h3>
                <p className="stat-number">{applications.length}</p>
                <i className="stat-icon fas fa-file-alt"></i>
              </div>
              <div className="stat-card success">
                <h3>Active Jobs</h3>
                <p className="stat-number">{jobs.length}</p>
                <i className="stat-icon fas fa-briefcase"></i>
              </div>
              <div className="stat-card info">
                <h3>Profile Views</h3>
                <p className="stat-number">{profileViews}</p>
                <i className="stat-icon fas fa-eye"></i>
              </div>
              <div className="stat-card warning">
                <h3>Pending Applications</h3>
                <p className="stat-number">{applications.filter(app => app.status === 'Pending').length}</p>
                <i className="stat-icon fas fa-clock"></i>
              </div>
            </div>
            
            <div className="dashboard-sections">
              <div className="dashboard-section">
                <h3 className="section-title">Recent Applications</h3>
                {applications.length === 0 ? (
                  <p className="no-data-text">No applications yet. Browse jobs to apply.</p>
                ) : (
                  <div className="applications-list">
                    {applications.slice(0, 4).map(app => (
                      <div key={app._id} className="application-card">
                        <div className="application-header">
                          <h4 className="job-title">{app.jobId?.title || 'No title'}</h4>
                          <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
                        </div>
                        <p className="company-name">{app.jobId?.companyName || 'Unknown company'}</p>
                        <div className="application-meta">
                          <span><i className="fas fa-calendar-alt"></i> {new Date(app.appliedDate || Date.now()).toLocaleDateString()}</span>
                          <button 
                            onClick={() => deleteApplication(app._id)} 
                            className="delete-button small"
                          >
                            <i className="fas fa-trash"></i> Withdraw
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="dashboard-section">
                <h3 className="section-title">Recommended Jobs</h3>
                {jobs.length === 0 ? (
                  <p className="no-data-text">No recommended jobs available.</p>
                ) : (
                  <div className="recommended-jobs">
                    {jobs.slice(0, 3).map(job => (
                      <div key={job._id} className="job-card small">
                        <h4 className="job-title">{job.title || 'No title'}</h4>
                        <p className="company-name">{job.companyName || 'Unknown company'}</p>
                        <p className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location || 'Location not specified'}</p>
                        <button 
                          onClick={() => applyForJob(job._id)} 
                          className={`apply-button small ${hasApplied(job._id) ? 'applied' : ''}`}
                          disabled={hasApplied(job._id)}
                        >
                          {hasApplied(job._id) ? 'Applied' : 'Apply Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'viewJobs':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Available Jobs</h2>
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="no-data">
                <i className="fas fa-briefcase no-data-icon"></i>
                <p>No jobs match your search criteria.</p>
                <button className="reset-button" onClick={() => setSearchTerm('')}>
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="job-list">
                {filteredJobs.map(job => (
                  <div key={job._id} className="job-card">
                    <div className="job-header">
                      <div>
                        <h3 className="job-title">{job.title || 'No title'}</h3>
                        <p className="company-name">
                          {job.companyName || 'Unknown company'} 
                          <span className="job-type">{job.jobType || 'Full-time'}</span>
                        </p>
                      </div>
                      <span className="job-salary">
                        <i className="fas fa-money-bill-wave"></i> {job.salaryRange || 'Salary not specified'}
                      </span>
                    </div>
                    <p className="job-location">
                      <i className="fas fa-map-marker-alt"></i> {job.location || 'Location not specified'}
                    </p>
                    <p className="job-description">
                      {job.jobDescription?.length > 150 
                        ? `${job.jobDescription.substring(0, 150)}...` 
                        : job.jobDescription || 'No description provided'}
                    </p>
                    <div className="job-footer">
                      <div className="job-tags">
                        {job.skillsRequired?.slice(0, 3).map((skill, index) => (
                          <span key={index} className="job-tag">{skill}</span>
                        ))}
                      </div>
                      <div className="job-actions">
                        <button 
                          onClick={() => applyForJob(job._id)} 
                          className={`apply-button ${hasApplied(job._id) ? 'applied' : ''}`}
                          disabled={hasApplied(job._id)}
                        >
                          {hasApplied(job._id) ? (
                            <>
                              <i className="fas fa-check"></i> Applied
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane"></i> Apply Now
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'viewApplications':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Your Applications</h2>
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {applications.length === 0 ? (
              <div className="no-data">
                <i className="fas fa-file-alt no-data-icon"></i>
                <p>You haven't applied to any jobs yet.</p>
                <button 
                  className="primary-button" 
                  onClick={() => setActiveTab('viewJobs')}
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="applications-table-container">
                <div className="applications-table">
                  <div className="table-header">
                    <span className="header-item">Job Title</span>
                    <span className="header-item">Company</span>
                    <span className="header-item">Applied Date</span>
                    <span className="header-item">Status</span>
                    <span className="header-item">Actions</span>
                  </div>
                  {filteredApplications.map(app => (
                    <div key={app._id} className="table-row">
                      <span className="table-cell">
                        <div className="job-title-cell">
                          {app.jobId?.title || 'No title'}
                        </div>
                      </span>
                      <span className="table-cell">
                        {app.jobId?.companyName || 'Unknown company'}
                      </span>
                      <span className="table-cell">
                        {new Date(app.appliedDate || Date.now()).toLocaleDateString()}
                      </span>
                      <span className="table-cell">
                        <span className={`status-badge ${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </span>
                      <span className="table-cell">
                        <button 
                          onClick={() => deleteApplication(app._id)} 
                          className="delete-button"
                          title="Withdraw Application"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
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
            <i className="fas fa-briefcase logo-icon"></i>
            JobConnect
          </h1>
          {/* <div className="user-profile">
            <div className="profile-avatar">JS</div>
            <div className="profile-info">
              <p className="profile-name">Job Seeker</p>
              <p className="profile-email">user@example.com</p>
            </div>
          </div> */}
        </div>
        
        <nav className="nav-menu">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('viewJobs')} 
            className={`nav-button ${activeTab === 'viewJobs' ? 'active' : ''}`}
          >
            <i className="fas fa-search"></i>
            Browse Jobs
          </button>
          <button 
            onClick={() => setActiveTab('viewApplications')} 
            className={`nav-button ${activeTab === 'viewApplications' ? 'active' : ''}`}
          >
            <i className="fas fa-file-alt"></i>
            My Applications
          </button>
          <button 
            onClick={() => setActiveTab('savedJobs')} 
            className={`nav-button ${activeTab === 'savedJobs' ? 'active' : ''}`}
            disabled
            title="Coming Soon"
          >
            <i className="fas fa-bookmark"></i>
            Saved Jobs
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button 
            onClick={handleLogout} 
            className="logout-button"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
          <div className="app-version">v1.0.0</div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumbs">
            <span>Dashboard</span>
            {activeTab !== 'dashboard' && <span>{activeTab === 'viewJobs' ? 'Browse Jobs' : 'My Applications'}</span>}
          </div>
          {/* <div className="notifications">
            <button className="notification-button">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
          </div> */}
        </div>
        
        {renderTabContent()}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;