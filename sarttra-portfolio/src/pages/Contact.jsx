import React, { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  // Reset animations when component mounts
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Force a repaint to restart animations
    const elements = document.querySelectorAll('.contact-button-container, .contact-card, .contact-info-item, .form-group, .submit-button');
    elements.forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth; // Trigger reflow
      el.style.animation = '';
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    alert('Form submitted! This is a placeholder - you would typically send this data to a server.');
  };

  return (
    <div className="contact-container">
      {/* Floating diamonds for visual effect */}
      <div className="floating-diamond floating-diamond-1"></div>
      <div className="floating-diamond floating-diamond-2"></div>
      <div className="floating-diamond floating-diamond-3"></div>
      <div className="floating-diamond floating-diamond-4"></div>
      <div className="floating-diamond floating-diamond-5"></div>
      <div className="floating-diamond floating-diamond-6"></div>
      <div className="floating-diamond floating-diamond-7"></div>
      
      <div className="contact-content">
        <div className="contact-button-container">
          <div className="contact-button">Contact</div>
        </div>
        
        <div className="contact-cards-container">
          {/* Contact Information Card */}
          <div className="contact-card info-card">
            <h2 className="card-title">Contact Information</h2>
            
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="info-title">Address:</h3>
                  <p className="info-text">87/180 Burasiri Village, Pakkret, Nonthaburi, 11120</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="info-title">Email:</h3>
                  <p className="info-text">blue__2002@hotmail.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="info-title">Phone:</h3>
                  <p className="info-text">+66 61 863 2002</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Card */}
          <div className="contact-card form-card">
            <h2 className="card-title">Get in Touch</h2>
            <p className="card-description">
              Have a question or want to work together? Fill out the form and I'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input"
                  placeholder="Your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="form-textarea"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="submit-button"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 