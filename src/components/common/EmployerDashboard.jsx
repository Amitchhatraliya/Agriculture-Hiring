import React from 'react';
import { useState } from 'react';
import '../../assets/landing/css/employerdashboard.css'; // Import your CSS file for styling

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy data for jobs and workers
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Harvesting Job', location: 'Punjab', applicants: 5 },
    { id: 2, title: 'Livestock Manager', location: 'Gujarat', applicants: 3 },
  ]);

  const [workers, setWorkers] = useState([
    { id: 1, name: 'Rahul Sharma', skills: 'Harvesting, Irrigation', experience: '5 years' },
    { id: 2, name: 'Priya Singh', skills: 'Livestock Management', experience: '3 years' },
  ]);

  const handlePostJob = () => {
    // Logic to post a new job
    alert('Post a new job functionality');
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleSearchWorkers = () => {
    // Logic to search workers
    alert('Search workers functionality');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Employer Dashboard</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'postJob' ? 'active' : ''} onClick={() => setActiveTab('postJob')}>Post Job</li>
          <li className={activeTab === 'manageJobs' ? 'active' : ''} onClick={() => setActiveTab('manageJobs')}>Manage Jobs</li>
          <li className={activeTab === 'searchWorkers' ? 'active' : ''} onClick={() => setActiveTab('searchWorkers')}>Search Workers</li>
          <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>Messages</li>
          <li className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>Payments</li>
          <li className={activeTab === 'training' ? 'active' : ''} onClick={() => setActiveTab('training')}>Training</li>
          <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <h2>Welcome to Your Dashboard</h2>
            <p>Here you can manage your jobs, search for workers, and communicate with them.</p>
            <div className="stats">
              <div className="stat-card">
                <h3>Total Jobs Posted</h3>
                <p>{jobs.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Applicants</h3>
                <p>{jobs.reduce((acc, job) => acc + job.applicants, 0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'postJob' && (
          <div className="post-job">
            <h2>Post a New Job</h2>
            <form>
              <input type="text" placeholder="Job Title" required />
              <input type="text" placeholder="Location" required />
              <textarea placeholder="Job Description" required />
              <button type="button" onClick={handlePostJob}>Post Job</button>
            </form>
          </div>
        )}

        {activeTab === 'manageJobs' && (
          <div className="manage-jobs">
            <h2>Manage Jobs</h2>
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Applicants</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.applicants}</td>
                    <td>
                      <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'searchWorkers' && (
          <div className="search-workers">
            <h2>Search Workers</h2>
            <input type="text" placeholder="Search by skills or location" />
            <button onClick={handleSearchWorkers}>Search</button>
            <div className="worker-list">
              {workers.map(worker => (
                <div key={worker.id} className="worker-card">
                  <h3>{worker.name}</h3>
                  <p><strong>Skills:</strong> {worker.skills}</p>
                  <p><strong>Experience:</strong> {worker.experience}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages">
            <h2>Messages</h2>
            <p>Real-time communication with workers.</p>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments">
            <h2>Payments</h2>
            <p>View payment history and manage transactions.</p>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="training">
            <h2>Training Resources</h2>
            <p>Access agricultural training materials.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews">
            <h2>Reviews & Feedback</h2>
            <p>View feedback from workers and provide your own.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;