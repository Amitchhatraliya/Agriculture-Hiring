import React, { useState } from 'react';
import { FiBriefcase, FiCalendar, FiDollarSign, FiMessageSquare, FiUser, FiLogOut, FiSearch, FiBell, FiStar, FiMapPin } from 'react-icons/fi';

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New job offer from Green Valley Farms', time: '3 hours ago', read: false },
    { id: 2, text: 'Your application was viewed by FarmFresh Co.', time: '1 day ago', read: true },
  ]);

  const [availableJobs, setAvailableJobs] = useState([
    { 
      id: 1, 
      title: 'Harvest Worker', 
      farm: 'Sunny Acres', 
      location: 'Salinas, CA', 
      pay: '$18/hr', 
      duration: 'Seasonal (3 months)', 
      rating: 4.2,
      skills: ['Harvesting', 'Packing', 'Field work'],
      posted: '2 days ago',
      saved: false
    },
    { 
      id: 2, 
      title: 'Irrigation Specialist', 
      farm: 'Golden Fields', 
      location: 'Fresno, CA', 
      pay: '$22/hr', 
      duration: 'Full-time', 
      rating: 4.5,
      skills: ['Irrigation systems', 'Maintenance', 'Water management'],
      posted: '1 week ago',
      saved: true
    },
    { 
      id: 3, 
      title: 'Organic Farm Hand', 
      farm: 'Green Valley Farms', 
      location: 'Watsonville, CA', 
      pay: '$20/hr', 
      duration: 'Part-time', 
      rating: 4.8,
      skills: ['Weeding', 'Planting', 'Organic practices'],
      posted: '3 days ago',
      saved: false
    },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const toggleSaveJob = (id) => {
    setAvailableJobs(availableJobs.map(job => 
      job.id === id ? {...job, saved: !job.saved} : job
    ));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>🌱 AgriHire</h1>
          <p style={styles.logoSubtitle}>Worker Portal</p>
        </div>
        
        <nav style={styles.nav}>
          <button 
            style={activeTab === 'dashboard' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiBriefcase style={styles.navIcon} /> Dashboard
          </button>
          
          <button 
            style={activeTab === 'jobs' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('jobs')}
          >
            <FiBriefcase style={styles.navIcon} /> Find Jobs
          </button>
          
          <button 
            style={activeTab === 'applications' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('applications')}
          >
            <FiCalendar style={styles.navIcon} /> My Applications
          </button>
          
          <button 
            style={activeTab === 'earnings' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('earnings')}
          >
            <FiDollarSign style={styles.navIcon} /> Earnings
          </button>
          
          <button 
            style={activeTab === 'messages' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare style={styles.navIcon} /> Messages
          </button>
          
          <button 
            style={activeTab === 'profile' ? {...styles.navButton, ...styles.activeNavButton} : styles.navButton}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser style={styles.navIcon} /> My Profile
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
              placeholder="Search jobs, farms, locations..." 
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
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="User" 
                style={styles.profileImage}
              />
              <span style={styles.profileName}>Carlos Worker</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div style={styles.contentArea}>
          <div style={styles.welcomeBanner}>
            <h2 style={styles.welcomeTitle}>Welcome back, Carlos!</h2>
            <p style={styles.welcomeText}>You have <strong>3 applications</strong> in progress and <strong>2 new job</strong> matches today.</p>
            <button style={styles.primaryButton}>Update Availability</button>
          </div>
          
          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>8</h3>
              <p style={styles.statLabel}>Jobs Applied</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '60%', backgroundColor: '#4CAF50'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>3</h3>
              <p style={styles.statLabel}>Interviews</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '30%', backgroundColor: '#2196F3'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>$1,250</h3>
              <p style={styles.statLabel}>Earned This Month</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '45%', backgroundColor: '#FFC107'}}></div>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>4.7</h3>
              <p style={styles.statLabel}>Your Rating</p>
              <div style={styles.statProgress}>
                <div style={{...styles.progressBar, width: '94%', backgroundColor: '#9C27B0'}}></div>
              </div>
            </div>
          </div>
          
          {/* Available Jobs */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Available Jobs Near You</h3>
              <button style={styles.secondaryButton}>View All Jobs</button>
            </div>
            
            <div style={styles.jobsGrid}>
              {availableJobs.map(job => (
                <div key={job.id} style={styles.jobCard}>
                  <div style={styles.jobCardHeader}>
                    <h4 style={styles.jobTitle}>{job.title}</h4>
                    <button 
                      style={job.saved ? styles.savedButton : styles.saveButton}
                      onClick={() => toggleSaveJob(job.id)}
                    >
                      <FiStar style={job.saved ? {color: '#FFC107'} : {}} />
                    </button>
                  </div>
                  <p style={styles.jobFarm}>{job.farm}</p>
                  <div style={styles.jobLocation}>
                    <FiMapPin style={styles.jobIcon} />
                    <span>{job.location}</span>
                  </div>
                  <div style={styles.jobDetails}>
                    <span style={styles.jobPay}>{job.pay}</span>
                    <span style={styles.jobDuration}>{job.duration}</span>
                  </div>
                  <div style={styles.jobRating}>
                    <FiStar style={{color: '#FFC107', marginRight: '5px'}} />
                    <span>{job.rating}</span>
                  </div>
                  <div style={styles.jobSkills}>
                    {job.skills.map((skill, index) => (
                      <span key={index} style={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                  <div style={styles.jobFooter}>
                    <span style={styles.jobPosted}>Posted {job.posted}</span>
                    <button style={styles.applyButton}>Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>
            <div style={styles.activityList}>
              <div style={styles.activityItem}>
                <div style={styles.activityIcon}>📅</div>
                <div style={styles.activityContent}>
                  <p style={styles.activityText}>Interview scheduled with <strong>Sunny Acres</strong> for tomorrow at 10:00 AM</p>
                  <p style={styles.activityTime}>Today, 9:30 AM</p>
                </div>
              </div>
              <div style={styles.activityItem}>
                <div style={styles.activityIcon}>👍</div>
                <div style={styles.activityContent}>
                  <p style={styles.activityText}>Your application for <strong>Irrigation Specialist</strong> was accepted</p>
                  <p style={styles.activityTime}>Yesterday, 2:15 PM</p>
                </div>
              </div>
              <div style={styles.activityItem}>
                <div style={styles.activityIcon}>💬</div>
                <div style={styles.activityContent}>
                  <p style={styles.activityText}>New message from <strong>Green Valley Farms</strong> about your application</p>
                  <p style={styles.activityTime}>2 days ago</p>
                </div>
              </div>
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
    backgroundColor: '#27ae60',
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
    backgroundColor: '#2ecc71',
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
  welcomeBanner: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '30px',
    backgroundImage: 'linear-gradient(135deg, #27ae60, #2ecc71)',
  },
  welcomeTitle: {
    margin: '0 0 10px',
    fontSize: '24px',
    fontWeight: '600',
  },
  welcomeText: {
    margin: '0 0 15px',
    fontSize: '16px',
    opacity: '0.9',
  },
  primaryButton: {
    backgroundColor: 'white',
    color: '#27ae60',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#27ae60',
    border: '1px solid #27ae60',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
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
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    margin: '0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600',
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  jobCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    transition: 'all 0.2s',
  },
  jobCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  jobTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  saveButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#bdc3c7',
    cursor: 'pointer',
    fontSize: '18px',
  },
  savedButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFC107',
    cursor: 'pointer',
    fontSize: '18px',
  },
  jobFarm: {
    margin: '0 0 10px',
    color: '#7f8c8d',
    fontSize: '14px',
  },
  jobLocation: {
    display: 'flex',
    alignItems: 'center',
    color: '#7f8c8d',
    fontSize: '14px',
    marginBottom: '10px',
  },
  jobIcon: {
    marginRight: '5px',
    fontSize: '14px',
  },
  jobDetails: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
  },
  jobPay: {
    color: '#27ae60',
    fontWeight: '600',
    fontSize: '14px',
  },
  jobDuration: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  jobRating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#2c3e50',
  },
  jobSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '15px',
  },
  skillTag: {
    backgroundColor: '#e8f5e9',
    color: '#27ae60',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
  },
  jobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobPosted: {
    color: '#bdc3c7',
    fontSize: '12px',
  },
  applyButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
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
    color: '#27ae60',
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
};

export default WorkerDashboard;