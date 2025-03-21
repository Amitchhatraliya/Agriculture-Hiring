import React, { useState } from 'react';
import '../../assets/landing/css/admindashboard.css'; // Import your CSS file for styling

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy data for users, jobs, and payments
  const [users, setUsers] = useState([
    { id: 1, name: 'Rahul Sharma', role: 'Worker', email: 'rahul@example.com' },
    { id: 2, name: 'Priya Singh', role: 'Employer', email: 'priya@example.com' },
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Harvesting Job', location: 'Punjab', status: 'Open' },
    { id: 2, title: 'Livestock Manager', location: 'Gujarat', status: 'Closed' },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, amount: 5000, status: 'Completed', date: '2023-10-01' },
    { id: 2, amount: 3000, status: 'Pending', date: '2023-10-05' },
  ]);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</li>
          <li className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}>Jobs</li>
          <li className={activeTab === 'payments' ? 'active' : ''} onClick={() => setActiveTab('payments')}>Payments</li>
          <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Analytics</li>
          <li className={activeTab === 'training' ? 'active' : ''} onClick={() => setActiveTab('training')}>Training</li>
          <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-overview">
            <h2>Welcome to Admin Dashboard</h2>
            <p>Here you can manage users, jobs, payments, and platform analytics.</p>
            <div className="stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Jobs</h3>
                <p>{jobs.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Payments</h3>
                <p>{payments.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users">
            <h2>User Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs">
            <h2>Job Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.status}</td>
                    <td>
                      <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments">
            <h2>Payment Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>₹{payment.amount}</td>
                    <td>{payment.status}</td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Platform Analytics</h2>
            <p>Here you can view platform usage statistics.</p>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="training">
            <h2>Training Resources</h2>
            <p>Manage agricultural training materials and courses.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews">
            <h2>Reviews & Feedback</h2>
            <p>View and manage reviews and feedback from users.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;