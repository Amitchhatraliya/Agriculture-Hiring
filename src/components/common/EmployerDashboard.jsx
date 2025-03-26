import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiMessageSquare, FiSettings, FiLogOut, FiSearch, FiBell } from 'react-icons/fi';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New applicant for Farm Manager position', time: '2 hours ago', read: false },
    { id: 2, text: 'Your job posting has been approved', time: '1 day ago', read: true },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>🌱 AgriHire</h1>
          <p style={styles.logoSubtitle}>Employer Portal</p>
        </div>
        
        <nav style={styles.nav}>
          <button 
            style={activeTab === 'dashboard' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiUsers style={styles.navIcon} /> Dashboard
          </button>
          
          <button 
            style={activeTab === 'jobs' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('jobs')}
          >
            <FiCalendar style={styles.navIcon} /> Job Postings
          </button>
          
          <button 
            style={activeTab === 'applicants' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('applicants')}
          >
            <FiUsers style={styles.navIcon} /> Applicants
          </button>
          
          <button 
            style={activeTab === 'payments' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('payments')}
          >
            <FiDollarSign style={styles.navIcon} /> Payments
          </button>
          
          <button 
            style={activeTab === 'messages' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare style={styles.navIcon} /> Messages
          </button>
          
          <button 
            style={activeTab === 'settings' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings style={styles.navIcon} /> Settings
          </button>
        </nav>
        
        <button style={styles.logoutButton}>
          <FiLogOut style={styles.navIcon} /> Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.searchBar}>
            <FiSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search workers, jobs, applicants..." 
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.headerActions}>
            <div style={styles.notificationIconContainer}>
              <FiBell style={styles.notificationIcon} />
              {unreadNotifications > 0 && (
                <span style={styles.notificationBadge}>{unreadNotifications}</span>
              )}
              
              {/* Notification dropdown would go here */}
            </div>
            
            <div style={styles.userProfile}>
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User" 
                style={styles.profileImage}
              />
              <span style={styles.profileName}>John FarmOwner</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div style={styles.contentArea}>
          <h2 style={styles.contentTitle}>Employer Dashboard</h2>
          
          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>12</h3>
              <p style={styles.statLabel}>Active Job Postings</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '75%', backgroundColor: '#4CAF50'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>48</h3>
              <p style={styles.statLabel}>Total Applicants</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '60%', backgroundColor: '#2196F3'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>5</h3>
              <p style={styles.statLabel}>Interviews Scheduled</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '30%', backgroundColor: '#FFC107'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>$2,450</h3>
              <p style={styles.statLabel}>Total Spent</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '45%', backgroundColor: '#9C27B0'}}></div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recent Applicants</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Position</th>
                    <th style={styles.tableHeader}>Experience</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.userCell}>
                        <img 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          style={styles.tableUserImage}
                          alt="Applicant"
                        />
                        <span>Maria Sanchez</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>Farm Manager</td>
                    <td style={styles.tableCell}>5 years</td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusPending}>Pending Review</span>
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.actionButton}>View</button>
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.userCell}>
                        <img 
                          src="https://randomuser.me/api/portraits/men/22.jpg" 
                          style={styles.tableUserImage}
                          alt="Applicant"
                        />
                        <span>James Wilson</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>Harvest Worker</td>
                    <td style={styles.tableCell}>2 seasons</td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusInterview}>Interview Scheduled</span>
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.actionButton}>View</button>
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.userCell}>
                        <img 
                          src="https://randomuser.me/api/portraits/women/68.jpg" 
                          style={styles.tableUserImage}
                          alt="Applicant"
                        />
                        <span>Sarah Johnson</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>Irrigation Specialist</td>
                    <td style={styles.tableCell}>7 years</td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusHired}>Hired</span>
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.actionButton}>View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <div style={styles.quickActions}>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>📢</span>
                Post New Job
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>👥</span>
                Browse Workers
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>📅</span>
                Schedule Interview
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>💰</span>
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    padding: '0 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '20px',
  },
  logo: {
    margin: '0',
    fontSize: '24px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoSubtitle: {
    margin: '5px 0 0',
    fontSize: '12px',
    color: '#bdc3c7',
    fontWeight: '300',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    flex: '1',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    textAlign: 'left',
    borderRadius: '0',
  },
  activeNavButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  navIcon: {
    marginRight: '10px',
    fontSize: '16px',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    textAlign: 'left',
    marginTop: 'auto',
  },
  mainContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    zIndex: '1',
  },
  searchBar: {
    position: 'relative',
    width: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7f8c8d',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px 10px 40px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
  },
  searchInputFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 0 2px rgba(52,152,219,0.2)',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notificationIconContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  notificationIcon: {
    fontSize: '20px',
    color: '#7f8c8d',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileImage: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profileName: {
    fontSize: '14px',
    fontWeight: '500',
  },
  contentArea: {
    flex: '1',
    padding: '30px',
    overflowY: 'auto',
  },
  contentTitle: {
    margin: '0 0 25px',
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '600',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
  },
  statCardHover: {
    transform: 'translateY(-5px)',
  },
  statNumber: {
    margin: '0 0 5px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  statLabel: {
    margin: '0 0 15px',
    color: '#7f8c8d',
    fontSize: '14px',
  },
  statProgress: {
    height: '4px',
    backgroundColor: '#ecf0f1',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    margin: '0 0 20px',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    color: '#7f8c8d',
    fontSize: '14px',
    fontWeight: '500',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  tableRowHover: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    padding: '12px 15px',
    fontSize: '14px',
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  tableUserImage: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusInterview: {
    backgroundColor: '#cce5ff',
    color: '#004085',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusHired: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s',
  },
  actionButtonHover: {
    backgroundColor: '#2980b9',
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  quickActionButton: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #eee',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.2s',
  },
  quickActionButtonHover: {
    backgroundColor: '#3498db',
    color: 'white',
    transform: 'translateY(-2px)',
  },
  quickActionIcon: {
    fontSize: '24px',
  },
};

export default EmployerDashboard;