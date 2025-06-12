import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import project data
import { techProjects, vtuberProjects } from '../data/ProjectData';

// Import slider images for hero section
import sliderImage1 from '../assets/sarttra-slider-1.jpg';
import sliderImage2 from '../assets/sarttra-slider-2.jpg';
import sliderImage3 from '../assets/sarttra-slider-3.jpg';
import sliderImage4 from '../assets/sarttra-slider-4.PNG';
import sliderImage5 from '../assets/sarttra-slider-5.png';

const Home = () => {
  // Hero section slider images
  const sliderImages = [
    sliderImage1,
    sliderImage2,
    sliderImage3,
    sliderImage4,
    sliderImage5
  ];

  // Portfolio slider images - select 6 featured projects
  const portfolioSliderImages = [
    techProjects[0].image, // OrgBox Mobile
    techProjects[1].image, // StarryMatch
    techProjects[2].image, // Relics+
    vtuberProjects[0].image, // Honkai Star Rail Theory
    vtuberProjects[3].image, // Song Cover
    vtuberProjects[4].sliderImages[0].image // YCH Project
  ];

  // State to track current slide index for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to add a fade effect for hero slider
  const [isAnimating, setIsAnimating] = useState(false);
  
  // State for portfolio slider
  const [currentPortfolioSlide, setCurrentPortfolioSlide] = useState(0);
  const [isPortfolioAnimating, setIsPortfolioAnimating] = useState(false);

  // Add refs and visibility states for scroll-based animations
  const heroRef = useRef(null);
  const sarttrasWorldRef = useRef(null);
  const introductionRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  
  const [heroVisible, setHeroVisible] = useState(false);
  const [sarttrasWorldVisible, setSarttrasWorldVisible] = useState(false);
  const [introductionVisible, setIntroductionVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  // Function to go to next slide for hero slider
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  // Function to go to previous slide for hero slider
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  // Function to go to next slide for portfolio slider
  const nextPortfolioSlide = () => {
    if (isPortfolioAnimating) return;
    setIsPortfolioAnimating(true);
    setTimeout(() => {
      setCurrentPortfolioSlide((prev) => (prev === portfolioSliderImages.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsPortfolioAnimating(false);
      }, 500);
    }, 500);
  };

  // Function to go to previous slide for portfolio slider
  const prevPortfolioSlide = () => {
    if (isPortfolioAnimating) return;
    setIsPortfolioAnimating(true);
    setTimeout(() => {
      setCurrentPortfolioSlide((prev) => (prev === 0 ? portfolioSliderImages.length - 1 : prev - 1));
      setTimeout(() => {
        setIsPortfolioAnimating(false);
      }, 500);
    }, 500);
  };

  // Auto-rotate hero slides every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Auto-rotate portfolio slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPortfolioAnimating) {
        nextPortfolioSlide();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPortfolioAnimating]);

  // Scroll to top when component mounts and set up scroll animations
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set a timeout to trigger the hero animation after component mount
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 300);

    // Set up intersection observers for scroll-based triggering
    const observerOptions = { 
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };
    
    // Create observers for each section
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          heroObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const sarttrasWorldObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSarttrasWorldVisible(true);
          sarttrasWorldObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const introductionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIntroductionVisible(true);
          introductionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const portfolioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPortfolioVisible(true);
          portfolioObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (sarttrasWorldRef.current) sarttrasWorldObserver.observe(sarttrasWorldRef.current);
    if (introductionRef.current) introductionObserver.observe(introductionRef.current);
    if (skillsRef.current) skillsObserver.observe(skillsRef.current);
    if (portfolioRef.current) portfolioObserver.observe(portfolioRef.current);

    return () => {
      clearTimeout(timer);
      // Clean up all observers
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (sarttrasWorldRef.current) sarttrasWorldObserver.unobserve(sarttrasWorldRef.current);
      if (introductionRef.current) introductionObserver.unobserve(introductionRef.current);
      if (skillsRef.current) skillsObserver.unobserve(skillsRef.current);
      if (portfolioRef.current) portfolioObserver.unobserve(portfolioRef.current);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Floating diamonds for hero section */}
      <section ref={heroRef} className={`hero-section ${heroVisible ? 'fade-in' : ''}`}>
        <div className="floating-diamond floating-diamond-1"></div>
        <div className="floating-diamond floating-diamond-2"></div>
        <div className="floating-diamond floating-diamond-3"></div>
        <div className="floating-diamond floating-diamond-4"></div>
        <div className="floating-diamond floating-diamond-5"></div>
        
        {/* Slider Section */}
        <div className="slider-section">
          <div className="diamond-container">
            <div className="diamond-inner"></div>
            <div className="diamond-shape">
              {/* Slider Images */}
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`slider-image ${
                    index === currentSlide ? 'slider-image-active' : 'slider-image-inactive'
                  }`}
                  style={{ 
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            className="nav-arrow prev-arrow"
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="nav-arrow next-arrow"
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Welcome Content - moved outside slider section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome!</h1>
          <div className="welcome-content">
            <p className="welcome-description">
              This is the home page of our portfolio website. Here you can showcase your main content,
              featured projects, or a brief introduction about yourself or your company.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Work section with floating diamonds */}
      <section className="featured-work-section">
        {/* Floating diamonds for featured section */}
        <div className="floating-diamond floating-diamond-6"></div>
        <div className="floating-diamond floating-diamond-7"></div>
        <div className="floating-diamond floating-diamond-8"></div>
        <div className="floating-diamond floating-diamond-9"></div>
        <div className="floating-diamond floating-diamond-10"></div>
        
        {/* Sarttra's World Button Container */}
        <div ref={sarttrasWorldRef} className={`sarttras-world-button-container ${sarttrasWorldVisible ? 'fade-in' : ''}`}>
          <div className="sarttras-world-button">
            <h2>Sarttra's World</h2>
          </div>
        </div>
        
        <div className="featured-work-content">
          <div ref={introductionRef} className={`introduction-text ${introductionVisible ? 'fade-in' : ''}`}>
            <p>
              Hello! My name is Blue, I am graduated students at the Faculty of Information and Communication
              Technology, Mahidol University have passion for IT, Art, and VTuber stuffs.
            </p>
          </div>

          <div ref={skillsRef} className={`skills-section ${skillsVisible ? 'fade-in' : ''}`}>
            <div className="skills-header">
              <span>Main Skills</span>
            </div>

            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon tech-icon"></div>
                <p>Tech Skills</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon art-icon"></div>
                <p>Art Skills</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon editing-icon"></div>
                <p>Editing & Content<br />Creator Skills</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon language-icon"></div>
                <p>Language Skills</p>
              </div>
              <div className="skill-item management-item">
                <div className="skill-icon management-icon"></div>
                <p>Communication<br />and<br />Management<br />Skills</p>
              </div>
            </div>
          </div>

          <div ref={portfolioRef} className={`portfolio-section ${portfolioVisible ? 'fade-in' : ''}`}>
            <div className="portfolio-header">
              <span>Portfolio Synopsis</span>
            </div>

            <div className="portfolio-preview">
              <div className="portfolio-slider">
                {/* Portfolio Slider Images */}
                {portfolioSliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`portfolio-slide ${
                      index === currentPortfolioSlide ? 'portfolio-slide-active' : 'portfolio-slide-inactive'
                    }`}
                    style={{ 
                      backgroundImage: `url(${image})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </div>
              <div className="portfolio-description">
                <p>This portfolio showcases my diverse range of skills and projects spanning technology, art, content creation, and more. Explore my work to see how I blend creativity with technical expertise.</p>
                <p>Each project represents my passion for innovation and my commitment to delivering high-quality results in everything I do.</p>
                
                <div className="button-container">
                  <Link to="/portfolio" className="view-portfolio-button">
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 