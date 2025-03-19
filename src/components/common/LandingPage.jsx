import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../../assets/landing/css/responsive.css';
import '../../assets/landing/css/style.css';
import '../../assets/landingpage.css';
import Hero from '../../assets/landing/images/Hero.jpg';
import Mission from '../../assets/landing/images/mission.jpg';
import Agriculture from '../../assets/landing/images/Agri.jpg';
import Team from '../../assets/landing/images/Team.jpg';
import Tractor from '../../assets/landing/images/Tractor.jpg';
import About from '../../assets/landing/images/Aboutus.jpg';
import '../../assets/landing/css/aboutus.css';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation to the login page
  const handleLogin = () => {
    navigate('/login'); // Replace '/login' with your login route
  };

  // Function to handle navigation to the signup page
  const handleSignup = () => {
    navigate('/signup'); // Replace '/signup' with your signup route
  };

  const handleAboutus = () => {
    navigate('/about-us'); // Replace '/about-us' with your About route
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2><strong>Welcome to Agriculture Hiring</strong></h2>
          <p>Connecting Farms with the Right Talent</p>
          <div className="auth-buttons">
            <button className="cta-button" onClick={handleLogin}>Login</button>
            <button className="cta-button" onClick={handleSignup}>Signup</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={Hero} alt="Farm Workers" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={Mission} alt="Feature 1" />
            <h3>Skilled Workforce</h3>
            <p>We provide access to a pool of skilled and experienced agricultural workers.</p>
          </div>
          <div className="feature-card">
            <img src={Agriculture} alt="Feature 2" />
            <h3>Efficient Hiring</h3>
            <p>Streamline your hiring process with our easy-to-use platform.</p>
          </div>
          <div className="feature-card">
            <img src={Team} alt="Feature 3" />
            <h3>24/7 Support</h3>
            <p>Our team is always available to assist you with any queries.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Seasonal Workers</h3>
            <p>Find reliable seasonal workers for planting and harvesting.</p>
          </div>
          <div className="service-card">
            <h3>Full-Time Employees</h3>
            <p>Hire full-time employees for long-term farm operations.</p>
          </div>
          <div className="service-card">
            <h3>Training Programs</h3>
            <p>Access training programs to upskill your workforce.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <h3>1. Sign Up</h3>
            <p>Create an account and post your job requirements.</p>
          </div>
          <div className="step-card">
            <h3>2. Match Workers</h3>
            <p>We match you with skilled workers based on your needs.</p>
          </div>
          <div className="step-card">
            <h3>3. Hire & Manage</h3>
            <p>Hire workers and manage them through our platform.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Agriculture Hiring</h2>
        <p>
          Agriculture Hiring is a platform dedicated to connecting farms with the right talent. Whether you need seasonal workers or full-time employees, we make the hiring process simple and efficient.
        </p>
        <button className="cta-button" onClick={handleAboutus}>Learn More</button>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img src={Tractor} alt="Client 1" />
            <p>"Agriculture Hiring helped us find the perfect workers for our farm. Highly recommended!"</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-card">
            <img src={About} alt="Client 2" />
            <p>"The platform is easy to use, and the support team is fantastic."</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>&copy; 2023 Agriculture Hiring. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;