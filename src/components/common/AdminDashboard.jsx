import React, { useState } from 'react';
import { FiUsers, FiBriefcase, FiDollarSign, FiSettings, FiLogOut, FiSearch, FiBell, FiPieChart, FiAlertTriangle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New employer registration requires approval', time: '1 hour ago', read: false },
    { id: 2, text: 'System maintenance scheduled for tonight', time: '3 hours ago', read: true },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Sample data
  const stats = {
    totalUsers: 1243,
    newUsers: 42,
    totalJobs: 567,
    pendingApprovals: 8,
    revenue: 12540,
    disputes: 3
  };

  const recentActivities = [
    { id: 1, type: 'new_employer', name: 'Green Valley Farms', time: '10 minutes ago' },
    { id: 2, type: 'job_posted', name: 'Harvest Worker Position', time: '25 minutes ago' },
    { id: 3, type: 'payment', name: 'Worker payout completed', amount: '$1,245', time: '1 hour ago' },
    { id: 4, type: 'dispute', name: 'Job completion dispute', time: '2 hours ago' },
  ];

  const recentUsers = [
    { id: 1, name: 'Carlos Worker', type: 'worker', joinDate: 'Today', status: 'verified' },
    { id: 2, name: 'FarmFresh Co.', type: 'employer', joinDate: 'Yesterday', status: 'pending' },
    { id: 3, name: 'Maria Sanchez', type: 'worker', joinDate: '2 days ago', status: 'verified' },
    { id: 4, name: 'John FarmOwner', type: 'employer', joinDate: '3 days ago', status: 'verified' },
  ];

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new_employer': return <FiUsers style={{color: '#3498db'}} />;
      case 'job_posted': return <FiBriefcase style={{color: '#2ecc71'}} />;
      case 'payment': return <FiDollarSign style={{color: '#f39c12'}} />;
      case 'dispute': return <FiAlertTriangle style={{color: '#e74c3c'}} />;
      default: return <FiUsers />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>🌱 AgriHire</h1>
          <p style={styles.logoSubtitle}>Admin Portal</p>
        </div>
        
        <nav style={styles.nav}>
          <button 
            style={activeTab === 'overview' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('overview')}
          >
            <FiPieChart style={styles.navIcon} /> Overview
          </button>
          
          <button 
            style={activeTab === 'users' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers style={styles.navIcon} /> Users
          </button>
          
          <button 
            style={activeTab === 'jobs' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('jobs')}
          >
            <FiBriefcase style={styles.navIcon} /> Jobs
          </button>
          
          <button 
            style={activeTab === 'payments' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('payments')}
          >
            <FiDollarSign style={styles.navIcon} /> Payments
          </button>
          
          <button 
            style={activeTab === 'reports' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('reports')}
          >
            <FiTrendingUp style={styles.navIcon} /> Reports
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
              placeholder="Search users, jobs, reports..." 
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.headerActions}>
            <div style={styles.notificationIconContainer}>
              <FiBell style={styles.notificationIcon} />
              {unreadNotifications > 0 && (
                <span style={styles.notificationBadge}>{unreadNotifications}</span>
              )}
            </div>
            
            <div style={styles.userProfile}>
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Admin" 
                style={styles.profileImage}
              />
              <span style={styles.profileName}>Admin User</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div style={styles.contentArea}>
          <h2 style={styles.contentTitle}>Admin Dashboard</h2>
          
          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <FiUsers style={styles.statIcon} />
              </div>
              <div>
                <h3 style={styles.statNumber}>{stats.totalUsers}</h3>
                <p style={styles.statLabel}>Total Users</p>
              </div>
              <div style={styles.statTrend}>
                <FiTrendingUp style={{color: '#2ecc71'}} />
                <span style={styles.trendText}>+{stats.newUsers} today</span>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <FiBriefcase style={styles.statIcon} />
              </div>
              <div>
                <h3 style={styles.statNumber}>{stats.totalJobs}</h3>
                <p style={styles.statLabel}>Total Jobs</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <FiAlertTriangle style={styles.statIcon} />
              </div>
              <div>
                <h3 style={styles.statNumber}>{stats.pendingApprovals}</h3>
                <p style={styles.statLabel}>Pending Approvals</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statIconContainer}>
                <FiDollarSign style={styles.statIcon} />
              </div>
              <div>
                <h3 style={styles.statNumber}>${stats.revenue.toLocaleString()}</h3>
                <p style={styles.statLabel}>Monthly Revenue</p>
              </div>
            </div>
          </div>
          
          {/* Recent Activity and Users */}
          <div style={styles.columnsContainer}>
            <div style={styles.column}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                <div style={styles.activityList}>
                  {recentActivities.map(activity => (
                    <div key={activity.id} style={styles.activityItem}>
                      <div style={styles.activityIcon}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div style={styles.activityContent}>
                        <p style={styles.activityText}>
                          {activity.type === 'new_employer' && `New employer registered: ${activity.name}`}
                          {activity.type === 'job_posted' && `New job posted: ${activity.name}`}
                          {activity.type === 'payment' && `Payment processed: ${activity.amount}`}
                          {activity.type === 'dispute' && `New dispute reported: ${activity.name}`}
                        </p>
                        <p style={styles.activityTime}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={styles.viewAllButton}>View All Activity</button>
              </div>
            </div>
            
            <div style={styles.column}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Recent Users</h3>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Type</th>
                        <th style={styles.tableHeader}>Joined</th>
                        <th style={styles.tableHeader}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id} style={styles.tableRow}>
                          <td style={styles.tableCell}>{user.name}</td>
                          <td style={styles.tableCell}>
                            <span style={user.type === 'worker' ? styles.workerBadge : styles.employerBadge}>
                              {user.type}
                            </span>
                          </td>
                          <td style={styles.tableCell}>{user.joinDate}</td>
                          <td style={styles.tableCell}>
                            {user.status === 'verified' ? (
                              <span style={styles.verifiedStatus}>
                                <FiCheckCircle style={{marginRight: '5px'}} /> Verified
                              </span>
                            ) : (
                              <span style={styles.pendingStatus}>Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button style={styles.viewAllButton}>View All Users</button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Platform Statistics</h3>
            <div style={styles.statsGrid}>
              <div style={styles.platformStat}>
                <h4 style={styles.platformStatTitle}>Active Jobs</h4>
                <p style={styles.platformStatNumber}>289</p>
                <div style={styles.platformStatProgress}>
                  <div style={{...styles.progressBar, width: '72%', backgroundColor: '#3498db'}}></div>
                </div>
              </div>
              
              <div style={styles.platformStat}>
                <h4 style={styles.platformStatTitle}>Completed Jobs</h4>
                <p style={styles.platformStatNumber}>178</p>
                <div style={styles.platformStatProgress}>
                  <div style={{...styles.progressBar, width: '45%', backgroundColor: '#2ecc71'}}></div>
                </div>
              </div>
              
              <div style={styles.platformStat}>
                <h4 style={styles.platformStatTitle}>Active Disputes</h4>
                <p style={styles.platformStatNumber}>5</p>
                <div style={styles.platformStatProgress}>
                  <div style={{...styles.progressBar, width: '10%', backgroundColor: '#e74c3c'}}></div>
                </div>
              </div>
              
              <div style={styles.platformStat}>
                <h4 style={styles.platformStatTitle}>User Satisfaction</h4>
                <p style={styles.platformStatNumber}>4.6/5</p>
                <div style={styles.platformStatProgress}>
                  <div style={{...styles.progressBar, width: '92%', backgroundColor: '#f39c12'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <div style={styles.quickActions}>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>👥</span>
                Approve Users
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>📝</span>
                Review Jobs
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>💰</span>
                Process Payouts
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>⚖️</span>
                Resolve Disputes
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.quickActionIcon}>📊</span>
                Generate Report
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
    backgroundColor: '#34495e',
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
    color: 'rgba(255,255,255,0.8)',
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
    color: 'rgba(255,255,255,0.9)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    textAlign: 'left',
    borderRadius: '0',
  },
  activeNavButton: {
    backgroundColor: '#2c3e50',
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
    color: 'rgba(255,255,255,0.9)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  statIconContainer: {
    backgroundColor: '#ecf0f1',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: '20px',
    color: '#34495e',
  },
  statNumber: {
    margin: '0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  statLabel: {
    margin: '5px 0 0',
    color: '#7f8c8d',
    fontSize: '14px',
  },
  statTrend: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#7f8c8d',
  },
  trendText: {
    fontSize: '12px',
  },
  columnsContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  column: {
    flex: '1',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    margin: '0 0 20px',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  activityItem: {
    display: 'flex',
    gap: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  activityIcon: {
    fontSize: '20px',
    marginTop: '3px',
  },
  activityContent: {
    flex: '1',
  },
  activityText: {
    margin: '0 0 5px',
    fontSize: '14px',
  },
  activityTime: {
    margin: '0',
    color: '#bdc3c7',
    fontSize: '12px',
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '15px',
    padding: '0',
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
  tableCell: {
    padding: '12px 15px',
    fontSize: '14px',
  },
  workerBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  employerBadge: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  verifiedStatus: {
    color: '#2ecc71',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  pendingStatus: {
    color: '#f39c12',
    fontSize: '14px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  platformStat: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '15px',
  },
  platformStatTitle: {
    margin: '0 0 10px',
    color: '#7f8c8d',
    fontSize: '14px',
    fontWeight: '500',
  },
  platformStatNumber: {
    margin: '0 0 15px',
    fontSize: '22px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  platformStatProgress: {
    height: '6px',
    backgroundColor: '#ecf0f1',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
  quickActionIcon: {
    fontSize: '24px',
  },
};

export default AdminDashboard;