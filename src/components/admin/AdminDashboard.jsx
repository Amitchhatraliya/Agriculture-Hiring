import React, { useState, useEffect } from 'react';

const AgricultureHiringDashboard = () => {
  // State for tabs
  const [activeTab, setActiveTab] = useState('jobs');
  
  // State for jobs
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: 'Full-time'
  });
  
  // State for workers/employers
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'worker',
    skills: ''
  });
  
  // State for applications
  const [applications, setApplications] = useState([]);
  
  // Mock data initialization
  useEffect(() => {
    // Initialize with some mock data
    setJobs([
      { id: 1, title: 'Farm Manager', description: 'Manage daily farm operations', location: 'Iowa', salary: '$45,000', type: 'Full-time' },
      { id: 2, title: 'Seasonal Harvest Worker', description: 'Fruit and vegetable harvesting', location: 'California', salary: '$15/hr', type: 'Seasonal' }
    ]);
    
    setUsers([
      { id: 1, name: 'John Farmer', email: 'john@example.com', phone: '555-1234', type: 'employer', skills: '' },
      { id: 2, name: 'Maria Worker', email: 'maria@example.com', phone: '555-5678', type: 'worker', skills: 'Harvesting, Irrigation' }
    ]);
    
    setApplications([
      { id: 1, jobId: 1, applicantId: 2, status: 'Pending', appliedDate: '2023-05-15' }
    ]);
  }, []);
  
  // Handle job form submission
  const handleAddJob = (e) => {
    e.preventDefault();
    const jobWithId = { ...newJob, id: jobs.length + 1 };
    setJobs([...jobs, jobWithId]);
    setNewJob({
      title: '',
      description: '',
      location: '',
      salary: '',
      type: 'Full-time'
    });
  };
  
  // Handle user form submission
  const handleAddUser = (e) => {
    e.preventDefault();
    const userWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, userWithId]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      type: 'worker',
      skills: ''
    });
  };
  
  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'addJob':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Add New Job</h2>
            <form onSubmit={handleAddJob} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title:</label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description:</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  style={{...styles.input, height: '100px'}}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Location:</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Salary:</label>
                <input
                  type="text"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Type:</label>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  style={styles.input}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <button type="submit" style={styles.submitButton}>Add Job</button>
            </form>
          </div>
        );
        
      case 'jobs':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Job Listings</h2>
            <button 
              onClick={() => setActiveTab('addJob')} 
              style={{...styles.button, marginBottom: '20px'}}
            >
              Add New Job
            </button>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Salary</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td style={styles.td}>{job.title}</td>
                      <td style={styles.td}>{job.location}</td>
                      <td style={styles.td}>{job.salary}</td>
                      <td style={styles.td}>{job.type}</td>
                      <td style={styles.td}>
                        <button style={{...styles.button, padding: '5px 10px', marginRight: '5px'}}>View</button>
                        <button style={{...styles.button, padding: '5px 10px', backgroundColor: '#dc3545'}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'addUser':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Add Worker/Employer</h2>
            <form onSubmit={handleAddUser} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone:</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Type:</label>
                <select
                  value={newUser.type}
                  onChange={(e) => setNewUser({...newUser, type: e.target.value})}
                  style={styles.input}
                >
                  <option value="worker">Worker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
              {newUser.type === 'worker' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Skills:</label>
                  <input
                    type="text"
                    value={newUser.skills}
                    onChange={(e) => setNewUser({...newUser, skills: e.target.value})}
                    style={styles.input}
                    placeholder="Comma separated skills"
                  />
                </div>
              )}
              <button type="submit" style={styles.submitButton}>Add {newUser.type === 'worker' ? 'Worker' : 'Employer'}</button>
            </form>
          </div>
        );
        
      case 'users':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>{activeTab === 'users' ? 'Workers/Employers' : 'Applications'}</h2>
            <button 
              onClick={() => setActiveTab('addUser')} 
              style={{...styles.button, marginBottom: '20px'}}
            >
              Add New User
            </button>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={styles.td}>{user.name}</td>
                      <td style={styles.td}>{user.email}</td>
                      <td style={styles.td}>{user.phone}</td>
                      <td style={styles.td}>{user.type}</td>
                      <td style={styles.td}>
                        <button style={{...styles.button, padding: '5px 10px', marginRight: '5px'}}>View</button>
                        <button style={{...styles.button, padding: '5px 10px', backgroundColor: '#dc3545'}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'applications':
        return (
          <div style={styles.tabContent}>
            <h2 style={styles.tabTitle}>Job Applications</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Job Title</th>
                    <th style={styles.th}>Applicant</th>
                    <th style={styles.th}>Applied Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => {
                    const job = jobs.find(j => j.id === app.jobId) || {};
                    const applicant = users.find(u => u.id === app.applicantId) || {};
                    return (
                      <tr key={app.id}>
                        <td style={styles.td}>{job.title}</td>
                        <td style={styles.td}>{applicant.name}</td>
                        <td style={styles.td}>{app.appliedDate}</td>
                        <td style={styles.td}>
                          <select 
                            value={app.status} 
                            onChange={(e) => {
                              const updatedApps = applications.map(a => 
                                a.id === app.id ? {...a, status: e.target.value} : a
                              );
                              setApplications(updatedApps);
                            }}
                            style={{...styles.input, padding: '5px', width: 'auto'}}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={styles.td}>
                          <button style={{...styles.button, padding: '5px 10px'}}>View Details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return <div style={styles.tabContent}>Select a tab to view content</div>;
    }
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.title}>Agriculture Hiring Admin Dashboard</h1>
      </header>
      
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <button 
            onClick={() => setActiveTab('jobs')} 
            style={activeTab === 'jobs' ? styles.activeTabButton : styles.tabButton}
          >
            View Jobs
          </button>
          <button 
            onClick={() => setActiveTab('addJob')} 
            style={activeTab === 'addJob' ? styles.activeTabButton : styles.tabButton}
          >
            Add Job
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            style={activeTab === 'users' ? styles.activeTabButton : styles.tabButton}
          >
            View Workers/Employers
          </button>
          <button 
            onClick={() => setActiveTab('addUser')} 
            style={activeTab === 'addUser' ? styles.activeTabButton : styles.tabButton}
          >
            Add Worker/Employer
          </button>
          <button 
            onClick={() => setActiveTab('applications')} 
            style={activeTab === 'applications' ? styles.activeTabButton : styles.tabButton}
          >
            View Applications
          </button>
        </div>
        
        <main style={styles.mainContent}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

// Styles
const styles = {
  dashboard: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#343a40',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s',
  },
  activeTabButton: {
    backgroundColor: '#28a745',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'white',
  },
  tabContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  tabTitle: {
    color: '#28a745',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    color: '#495057',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    verticalAlign: 'middle',
  },
};

export default AgricultureHiringDashboard;