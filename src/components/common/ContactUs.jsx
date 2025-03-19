import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../../assets/landing/css/contactus.css'; // Create a CSS file for custom styles

export const ContactUs = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help! Reach out to us for any inquiries or feedback.</p>
        </div>
      </div>

      {/* Contact Form and Information Section */}
      <div className="contact-section">
        <div className="container">
          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" className="animated-input" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" className="animated-input" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Enter your message" rows="5" className="animated-input"></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <FaEnvelope className="icon" />
              <p>Email: support@agriculturehiring.com</p>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <p>Address: 123 Farm Lane, Agriculture City, Country</p>
            </div>

            {/* Social Media Links */}
            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="social-icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="social-icon" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Integration */}
      <div className="map-section">
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f4f4b8e!2sAgriculture%20City!5e0!3m2!1sen!2sus!4v1622549400000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};