import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    // Check if already on contact page
    if (location.pathname === '/contact') {
      // Just scroll to top if already on contact page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Navigate to contact page and then scroll to top
      navigate('/contact');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-title">Let's Talk</h2>
          <p className="footer-description">
            Start a conversation about your project and let's create something amazing together.
          </p>
          <button className="footer-button" onClick={handleContactClick}>
            Contact Me
          </button>
        </div>
        
        <div className="footer-right">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email:</h3>
              <a href="mailto:blue__2002@hotmail.com" className="info-value">blue__2002@hotmail.com</a>
            </div>
            
            <div className="info-item">
              <h3>Phone:</h3>
              <a href="tel:+66618632002" className="info-value">+66 61 863 2002</a>
            </div>
            
            <div className="social-links">
              <a href="https://www.facebook.com/blue.b.blue.986" className="social-link"><FaFacebook /></a>
              <a href="https://www.instagram.com/bxru.stp/" className="social-link"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/sarttra-prasongtichol/" className="social-link"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} SARTTRA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 