import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Portfolio.css';
import { techProjects, vtuberProjects } from '../data/ProjectData';

// Function to render text with URLs as clickable links
const renderTextWithLinks = (text) => {
  if (!text) return '';
  
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // If no URLs found, return the text as is
  if (!urlRegex.test(text)) return text;
  
  // Split text by URLs and create an array of text and link elements
  const parts = text.split(urlRegex);
  const matches = text.match(urlRegex);
  
  return parts.map((part, index) => {
    // If this part is a URL, render it as a link
    if (matches && matches.indexOf(part) !== -1) {
      return (
        <a 
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="description-link"
        >
          {part}
        </a>
      );
    }
    // Otherwise, render as plain text
    return part;
  });
};

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visible, setVisible] = useState(false);
  const [tagFilter, setTagFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [animationReset, setAnimationReset] = useState(false);
  
  // Refs for scroll animation
  const portfolioRef = useRef(null);
  const techProjectsRef = useRef(null);
  const vtuberProjectsRef = useRef(null);
  const tagDropdownRef = useRef(null);
  
  // States for animations
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [techProjectsVisible, setTechProjectsVisible] = useState(false);
  const [vtuberProjectsVisible, setVtuberProjectsVisible] = useState(false);

  // State for the slider
  const [currentSlide, setCurrentSlide] = useState(0);
  // Ref to store interval
  const intervalRef = useRef(null);

  // Combined projects
  const allProjects = [...techProjects, ...vtuberProjects];
  
  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set();
    // Create a map to normalize tag casing (e.g., E-commerce -> E-Commerce)
    const tagNormalizations = {
      'E-commerce': 'E-Commerce'
    };
    
    allProjects.forEach(project => {
      project.tags.forEach(tag => {
        // Use normalized version if it exists, otherwise use the original tag
        const normalizedTag = tagNormalizations[tag] || tag;
        tagSet.add(normalizedTag);
      });
    });
    return Array.from(tagSet).sort();
  }, [allProjects]);
  
  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Set document title when component mounts
    document.title = "Portfolio | Sarttra";
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Function to open modal with project details
  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setCurrentSlide(0); // Reset slide to first image when opening modal
  };
  
  // Function to close modal
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    // Clear any active interval when closing the modal
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-slider for StarryMatch project
  useEffect(() => {
    // Start auto-slider if project has sliderImages
    if (selectedProject && selectedProject.sliderImages) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Show first slide immediately, then quickly move to second
      setCurrentSlide(0);
      
      // Move to the second slide after a short delay
      setTimeout(() => {
        setCurrentSlide(1);
        
        // Then set up the regular interval for automatic rotation
        intervalRef.current = setInterval(() => {
          setCurrentSlide(prevSlide => 
            (prevSlide + 1) % selectedProject.sliderImages.length
          );
        }, 2000); // Change slide every 2 seconds for faster rotation
      }, 500); // Small delay before starting the rotation
    }
    
    // Clear interval when component unmounts or selectedProject changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedProject]);

  // Function to clear search and filters
  const clearSearch = () => {
    setSearchQuery('');
    setTagFilter('');
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
    // Reset animations when search changes
    setAnimationReset(true);
    setTimeout(() => setAnimationReset(false), 50);
  };

  // Function to filter projects
  const filteredProjects = () => {
    // First, filter by main category
    let projects;
    if (filter === 'all') {
      projects = allProjects;
    } else if (filter === 'tech') {
      projects = techProjects;
    } else if (filter === 'vtuber') {
      projects = vtuberProjects;
    } else {
      projects = allProjects;
    }
    
    // Then, apply tag filter if selected
    if (tagFilter) {
      projects = projects.filter(project => {
        // Special case for "E-Commerce" tag to handle both capitalization variants
        if (tagFilter === 'E-Commerce') {
          return project.tags.some(tag => 
            tag === 'E-Commerce' || tag === 'E-commerce'
          );
        }
        // Normal tag matching
        return project.tags.some(tag => tag === tagFilter);
      });
    }
    
    // Finally, apply search filter if there's a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(query) || 
        (project.subtitle && project.subtitle.toLowerCase().includes(query)) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (Array.isArray(project.description) 
          ? project.description.some(desc => desc.toLowerCase().includes(query))
          : project.description.toLowerCase().includes(query))
      );
    }
    
    return projects;
  };

  useEffect(() => {
    // Set a timeout to trigger the first animation after component mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    // Set up intersection observers for scroll-based triggering
    const observerOptions = { 
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };
    
    // Create observers for each section
    const portfolioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPortfolioVisible(true);
          portfolioObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const techProjectsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTechProjectsVisible(true);
          techProjectsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const vtuberProjectsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVtuberProjectsVisible(true);
          vtuberProjectsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    if (portfolioRef.current) portfolioObserver.observe(portfolioRef.current);
    if (techProjectsRef.current) techProjectsObserver.observe(techProjectsRef.current);
    if (vtuberProjectsRef.current) vtuberProjectsObserver.observe(vtuberProjectsRef.current);

    return () => {
      clearTimeout(timer);
      // Clean up all observers
      if (portfolioRef.current) portfolioObserver.unobserve(portfolioRef.current);
      if (techProjectsRef.current) techProjectsObserver.unobserve(techProjectsRef.current);
      if (vtuberProjectsRef.current) vtuberProjectsObserver.unobserve(vtuberProjectsRef.current);
    };
  }, []);

  return (
    <div className="portfolio-container">
      {/* Floating diamonds for visual effect */}
      <div className="floating-diamond floating-diamond-1"></div>
      <div className="floating-diamond floating-diamond-2"></div>
      <div className="floating-diamond floating-diamond-3"></div>
      <div className="floating-diamond floating-diamond-4"></div>
      <div className="floating-diamond floating-diamond-5"></div>
      <div className="floating-diamond floating-diamond-6"></div>
      <div className="floating-diamond floating-diamond-7"></div>
      
      <div className="portfolio-content">
        <div ref={portfolioRef} className={`portfolio-button-container ${portfolioVisible ? 'fade-in' : ''}`}>
          <div className="portfolio-button">
            Portfolio
          </div>
        </div>
        
        {/* Search and filters row */}
        <div className="search-filters-row">
          {/* Search bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search projects by title, tags, or description..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button className="clear-search" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Tag filter dropdown */}
          <div className="tag-filter-container">
            <div className="tag-filter-wrapper" ref={tagDropdownRef}>
              <div 
                className={`tag-filter-button ${dropdownOpen ? 'open' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {tagFilter ? tagFilter : 'Filter by Tag'}
                <span className="dropdown-icon">▼</span>
              </div>
              <div className={`tag-dropdown ${dropdownOpen ? 'open' : ''}`}>
                <div 
                  className={`tag-option ${!tagFilter ? 'active' : ''}`}
                  onClick={() => {
                    setTagFilter('');
                    setDropdownOpen(false);
                    // Reset animations when tag filter changes
                    setAnimationReset(true);
                    setTimeout(() => setAnimationReset(false), 50);
                  }}
                >
                  <div className="tag-checkbox"></div>
                  All Tags
                </div>
                {allTags.map(tag => (
                  <div 
                    key={tag} 
                    className={`tag-option ${tagFilter === tag ? 'active' : ''}`}
                    onClick={() => {
                      setTagFilter(tag);
                      setDropdownOpen(false);
                      // Reset animations when tag filter changes
                      setAnimationReset(true);
                      setTimeout(() => setAnimationReset(false), 50);
                    }}
                  >
                    <div className="tag-checkbox"></div>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter buttons row */}
        <div className="filter-buttons-row">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilter('all');
              if (tagFilter) setTagFilter('');
              // Reset animations when filter changes
              setAnimationReset(true);
              setTimeout(() => setAnimationReset(false), 50);
            }}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'tech' ? 'active' : ''}`}
            onClick={() => {
              setFilter('tech');
              if (tagFilter) setTagFilter('');
              // Reset animations when filter changes
              setAnimationReset(true);
              setTimeout(() => setAnimationReset(false), 50);
            }}
          >
            Tech
          </button>
          <button 
            className={`filter-button ${filter === 'vtuber' ? 'active' : ''}`}
            onClick={() => {
              setFilter('vtuber');
              if (tagFilter) setTagFilter('');
              // Reset animations when filter changes
              setAnimationReset(true);
              setTimeout(() => setAnimationReset(false), 50);
            }}
          >
            Vtuber
          </button>
        </div>
        
        {/* Projects grid */}
        <div className="portfolio-card">
          <div className="centered-container">
            {filteredProjects().length === 0 ? (
              <div className="no-projects-message">
                {searchQuery 
                  ? `No projects found matching "${searchQuery}"`
                  : "No projects found matching the selected filters."
                }
              </div>
            ) : (
              <div className="projects-count">
                {filteredProjects().length} {filteredProjects().length === 1 ? 'project' : 'projects'} found
                {searchQuery && <span> matching "{searchQuery}"</span>}
                {filter !== 'all' && !searchQuery && <span> in {filter === 'tech' ? 'Tech Projects' : 'Vtuber Projects'}</span>}
              </div>
            )}
            <div className="projects-grid">
              {filteredProjects().map((project) => (
                <div 
                  key={project.id} 
                  className={`project-item ${animationReset ? 'reset-animation' : ''}`}
                  data-project-id={project.id}
                  onClick={() => openModal(project)}
                >
                  <img 
                    src={project.image} 
              alt={project.title} 
                    className="project-image"
                  />
                  <div className="project-details">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project details modal */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={closeModal}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()} data-project-id={selectedProject.id}>
              <button className="modal-close" onClick={closeModal}>×</button>
              
              {/* Display YouTube embed if project has videoId */}
              {selectedProject.videoId ? (
                <div className="modal-video-container">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${selectedProject.videoId}?si=gZzhj9_-cqQXC6bG`}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : selectedProject.sliderImages ? (
                // Display slider for any project with sliderImages
                <div 
                  className="project-slider-container"
                >
                  <div className="project-slider">
                    {selectedProject.sliderImages.map((slide, index) => (
                      <div 
                        key={slide.id}
                        className={`project-slide ${index === currentSlide ? 'active' : index === (currentSlide + 1) % selectedProject.sliderImages.length ? 'next' : ''}`}
                      >
                        <a 
                          href={slide.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img 
                            src={slide.image} 
                            alt={`${selectedProject.title} ${index + 1}`} 
                            className={selectedProject.screentoneStyle ? 'screentone-optimized' : ''}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Display regular image for other projects
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="modal-image"
                />
              )}
              
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              {/* Display subtitle if available */}
              {selectedProject.subtitle && (
                <h3 className="modal-subtitle">{selectedProject.subtitle}</h3>
              )}
              
              {/* Handle description as either string or array of bullet points */}
              <div className="modal-description">
                {Array.isArray(selectedProject.description) ? (
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '0', textAlign: 'left' }}>
                    {selectedProject.description.map((item, index) => (
                      <li key={index} style={{ textAlign: 'left' }}>
                        {/* Check if the text contains a URL and convert it to a link */}
                        {renderTextWithLinks(item)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{renderTextWithLinks(selectedProject.description)}</p>
                )}
              </div>
              
              {/* Display installation guide if available */}
              {selectedProject.installationGuide && (
                <div className="modal-installation-guide">
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '15px 0', textAlign: 'left', backgroundColor: '#f0f8ff', padding: '15px 20px 15px 35px', borderRadius: '8px', border: '1px solid #d0e3f0', color: '#000' }}>
                    {selectedProject.installationGuide.map((item, index) => (
                      <li key={index} style={{ textAlign: 'left', marginBottom: '8px' }}>
                        {renderTextWithLinks(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Display YouTube link if available */}
              {selectedProject.videoUrl && (
                <div className="modal-link">
                  <a 
                    href={selectedProject.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="video-link youtube-link"
                  >
                    Watch on YouTube
                  </a>
                </div>
              )}
              
              {/* Display app download link if available */}
              {selectedProject.appUrl && (
                <div className="modal-link">
                  <a 
                    href={selectedProject.appUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="video-link app-link"
                  >
                    {selectedProject.downloadLabel || "Download App"}
                  </a>
                </div>
              )}
              
              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio; 