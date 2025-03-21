import React, { useState } from 'react';
import '../../assets/landing/css/workerdashboard.css'; // Import your CSS file for styling

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy data for jobs and applications
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Harvesting Job', location: 'Punjab', status: 'Open' },
    { id: 2, title: 'Livestock Manager', location: 'Gujarat', status: 'Closed' },
  ]);

  const [applications, setApplications] = useState([
    { id: 1, jobTitle: 'Harvesting Job', status: 'Applied' },
    { id: 2, jobTitle: 'Livestock Manager', status: 'Rejected' },
  ]);

  const handleApplyJob = (jobId) => {
    // Logic to apply for a job
    alert(`Applied for job ID: ${jobId}`);
  };

  const handleUpdateProfile = () => {
    // Logic to update profile
    alert('Update profile functionality');
  };

  const handleSearchJobs = () => {
    // Logic to search jobs
    alert('Search jobs functionality');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Worker Dashboard</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
          <li className={activeTab === 'searchJobs' ? 'active' : ''} onClick={() => setActiveTab('searchJobs')}>Search Jobs</li>
          <li className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>Applications</li>
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
            <p>Here you can manage your profile, search for jobs, and communicate with employers.</p>
            <div className="stats">
              <div className="stat-card">
                <h3>Total Jobs Applied</h3>
                <p>{applications.length}</p>
              </div>
              <div className="stat-card">
                <h3>Active Applications</h3>
                <p>{applications.filter(app => app.status === 'Applied').length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile">
            <h2>Profile Management</h2>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="text" placeholder="Location" required />
              <textarea placeholder="Skills and Certifications" required />
              <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
            </form>
          </div>
        )}

        {activeTab === 'searchJobs' && (
          <div className="search-jobs">
            <h2>Search Jobs</h2>
            <input type="text" placeholder="Search by location or job type" />
            <button onClick={handleSearchJobs}>Search</button>
            <div className="job-list">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                  <button onClick={() => handleApplyJob(job.id)}>Apply</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications">
            <h2>Job Applications</h2>
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.jobTitle}</td>
                    <td>{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages">
            <h2>Messages</h2>
            <p>Real-time communication with employers.</p>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments">
            <h2>Payments</h2>
            <p>View payment history and manage earnings.</p>
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
            <p>View feedback from employers and provide your own.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;