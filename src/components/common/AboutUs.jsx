import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/landing/css/responsive.css';
import '../../assets/landing/css/style.css';
import '../../assets/landing/css/aboutus.css';
import '../../assets/landingpage.css';
import AboutImage from '../../assets/landing/images/Aboutus.jpg';
import TeamImage from '../../assets/landing/images/Team.jpg';
import MissionImage from '../../assets/landing/images/mission.jpg';
import TestimonialImage from '../../assets/landing/images/Tractor.jpg';
import PartnerImage from '../../assets/landing/images/login.jpg';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1>About Agriculture Hiring</h1>
          <p>Connecting Farms with the Right Talent Since 2023</p>
          <button className="cta-button" onClick={handleBackToHome}>Back to Home</button>
        </div>
        <div className="about-hero-image">
          <img src={AboutImage} alt="About Us" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Agriculture Hiring, our mission is to bridge the gap between farms and skilled agricultural workers. We aim to simplify the hiring process, ensuring that farms get the talent they need to thrive.
          </p>
        </div>
        <div className="mission-image">
          <img src={MissionImage} alt="Our Mission" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2>Why Choose Us?</h2>
        <div className="why-choose-us-grid">
          <div className="why-choose-us-card">
            <h3>Expertise</h3>
            <p>With years of experience in the agricultural sector, we understand the unique needs of farms and workers alike.</p>
          </div>
          <div className="why-choose-us-card">
            <h3>Efficiency</h3>
            <p>Our streamlined hiring process ensures that you find the right talent quickly and efficiently.</p>
          </div>
          <div className="why-choose-us-card">
            <h3>Support</h3>
            <p>We provide ongoing support to both employers and employees to ensure a successful partnership.</p>
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={TeamImage} alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src={TeamImage} alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>COO</p>
          </div>
          <div className="team-member">
            <img src={TeamImage} alt="Team Member 3" />
            <h3>Mike Johnson</h3>
            <p>CTO</p>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img src={TestimonialImage} alt="Client 1" />
            <h3>Sarah Brown</h3>
            <p>"Agriculture Hiring has been a game-changer for our farm. We found skilled workers quickly and easily!"</p>
          </div>
          <div className="testimonial-card">
            <img src={TestimonialImage} alt="Client 2" />
            <h3>David Green</h3>
            <p>"The support from Agriculture Hiring is unmatched. They truly care about their clients."</p>
          </div>
          <div className="testimonial-card">
            <img src={TestimonialImage} alt="Client 3" />
            <h3>Emily White</h3>
            <p>"Efficient, reliable, and professional. I highly recommend Agriculture Hiring to any farm owner."</p>
          </div>
        </div>
      </section>

      {/* Partners Section
      <section className="partners-section">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          <div className="partner-card">
            <img src={PartnerImage} alt="Partner 1" />
            <h3>Green Fields Co.</h3>
          </div>
          <div className="partner-card">
            <img src={PartnerImage} alt="Partner 2" />
            <h3>AgriTech Solutions</h3>
          </div>
          <div className="partner-card">
            <img src={PartnerImage} alt="Partner 3" />
            <h3>Farmers United</h3>
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We believe in doing the right thing, always.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We constantly seek new ways to improve our services.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>We are committed to supporting the agricultural community.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>&copy; 2023 Agriculture Hiring. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;