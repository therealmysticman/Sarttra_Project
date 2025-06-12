import { useEffect, useState, useRef } from 'react';
import profilePic from '../assets/sarttra-slider-3.jpg';
import ictLogo from '../assets/ict_logo.png';
import sgLogo from '../assets/sg_logo.png';

// Import interest slider images
import reactTSlider from '../assets/react_t_slider.png';
import kusuriASlider from '../assets/kusuri_a_slider.png';
import lookbackASlider from '../assets/lookback_a_slider.png';
import mhaMSlider from '../assets/mha_m_slider.png';
import narutoASlider from '../assets/naruto_a_slider.png';
import oshiMSlider from '../assets/oshi_m_slider.png';
import silenthillfGSlider from '../assets/silenthillf_g_slider.png';
import bocchiASlider from '../assets/bocchi_a_slider.png';
import suiseiVSlider from '../assets/suisei_v_slider.png';
import zonaVSlider from '../assets/zona_v_slider.png';
import chainsawMSlider from '../assets/chainsaw_m_slider.png';
import fireforceMSlider from '../assets/fireforce_m_slider.png';
import chatgptTSlider from '../assets/chatgpt_t_slider.jpg';
import flutterTSlider from '../assets/flutter_t_slider.png';
import figmaTSlider from '../assets/figma_t_slider.png';
import starrailGSlider from '../assets/starrail_g_slider.jpg';
import valorantGSlider from '../assets/valorant_g_slider.png';
import repoGSlider from '../assets/repo_g_slider.png';
import adoJSlider from '../assets/ado_j_slider.png';
import kyoVSlider from '../assets/kyo_v_slider.png';
import radenVSlider from '../assets/raden_v_slider.png';
import natoriJSlider from '../assets/natori_j_slider.png';
import kyoJpopSlider from '../assets/kyo_j_slider.png';
import lalalaloveJSlider from '../assets/lana_j_slider.png';
import './About.css';
import { Link } from 'react-router-dom';

// Simple component for displaying skills on mobile with small progress bars
const MobileSkillItem = ({ name, percentage, skillType, isVisible }) => {
  // Convert percentage string to number
  const percentValue = parseInt(percentage);
  
  return (
    <div className="mobile-skill-item">
      <div className="mobile-skill-name">{name}</div>
      <div className="mobile-skill-content">
        <div className="mobile-skill-bar">
          <div className="mobile-skill-progress"></div>
          <div 
            className={`mobile-skill-fill ${skillType} ${isVisible ? 'animated' : ''}`} 
            style={{ width: isVisible ? `${percentValue}%` : '0%' }}
          ></div>
        </div>
        <div className="mobile-skill-percentage">{percentage}</div>
      </div>
    </div>
  );
};

const About = () => {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  // Add refs to store intervals
  const intervalRefs = useRef({});
  
  // Add state to track screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  
  // Add refs for each section
  const quoteRef = useRef(null);
  const profileRef = useRef(null);
  const educationRef = useRef(null);
  const detailedSkillsRef = useRef(null);
  const interestsRef = useRef(null);
  
  // Add visibility states for each section
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [detailedSkillsVisible, setDetailedSkillsVisible] = useState(false);
  const [interestsVisible, setInterestsVisible] = useState(false);

  // State for interest sliders
  const [currentSlides, setCurrentSlides] = useState({
    it: 0,
    anime: 0,
    manga: 0,
    game: 0,
    vtuber: 0,
    jpop: 0
  });

  // Define interest slider content
  const interestSliders = {
    it: [
      { id: 'react', image: reactTSlider },
      {id: 'chatgpt', image: chatgptTSlider},
      {id: 'flutter', image: flutterTSlider},
      {id: 'figma', image: figmaTSlider}
      // Add more IT images here
    ],
  
    manga: [
      { id: 'mha', image: mhaMSlider },
      { id: 'chainsaw', image: chainsawMSlider },
      { id: 'oshi', image: oshiMSlider },
      { id: 'fireforce', image: fireforceMSlider }
      // Add more Manga images here
    ],
    game: [
      { id: 'silenthillf', image: silenthillfGSlider },
      {id: 'starrail', image: starrailGSlider},
      {id: 'valorant', image: valorantGSlider},
      {id: 'Repo', image: repoGSlider}
      // Add Game images here
    ],
    vtuber: [
      { id: 'suisei', image: suiseiVSlider },
      {id: 'zona', image: zonaVSlider},
      {id: 'kyo', image: kyoVSlider},
      { id: 'raden', image: radenVSlider }
      // Add more Vtuber images here
    ],
    jpop: [
      { id: 'ado', image: adoJSlider },
      { id: 'natori', image: natoriJSlider },
      {id: 'kyojpop', image: kyoJpopSlider},
      {id: 'lalalalove', image: lalalaloveJSlider}
      // Add more J-POP images here
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track window resize for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    
    // Set a timeout to trigger the first animation after component mount
    const timer = setTimeout(() => {
      setQuoteVisible(true);
    }, 300);

    // Set up intersection observers for scroll-based triggering
    const observerOptions = { 
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };
    
    // Create observers for each section
    const quoteObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setQuoteVisible(true);
          quoteObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const profileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setProfileVisible(true);
          profileObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const educationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setEducationVisible(true);
          educationObserver.unobserve(entry.target);
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
    
    const detailedSkillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setDetailedSkillsVisible(true);
          detailedSkillsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const interestsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInterestsVisible(true);
          interestsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    if (quoteRef.current) quoteObserver.observe(quoteRef.current);
    if (profileRef.current) profileObserver.observe(profileRef.current);
    if (educationRef.current) educationObserver.observe(educationRef.current);
    if (skillsRef.current) skillsObserver.observe(skillsRef.current);
    if (detailedSkillsRef.current) detailedSkillsObserver.observe(detailedSkillsRef.current);
    if (interestsRef.current) interestsObserver.observe(interestsRef.current);

    return () => {
      clearTimeout(timer);
      
      // Clean up all observers
      if (quoteRef.current) quoteObserver.unobserve(quoteRef.current);
      if (profileRef.current) profileObserver.unobserve(profileRef.current);
      if (educationRef.current) educationObserver.unobserve(educationRef.current);
      if (skillsRef.current) skillsObserver.unobserve(skillsRef.current);
      if (detailedSkillsRef.current) detailedSkillsObserver.unobserve(detailedSkillsRef.current);
      if (interestsRef.current) interestsObserver.unobserve(interestsRef.current);
      
      // Clean up intervals
      Object.values(intervalRefs.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto rotation for IT slider - every 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        it: (prev.it + 1) % 4
      }));
    }, 3500);
    
    return () => clearTimeout(timer);
  }, [currentSlides.it]); // Only re-run when IT slider changes
  
  // Auto rotation for Anime slider - every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        anime: (prev.anime + 1) % 4
      }));
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentSlides.anime]); // Only re-run when Anime slider changes
  
  // Auto rotation for Manga slider - every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        manga: (prev.manga + 1) % 4
      }));
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [currentSlides.manga]); // Only re-run when Manga slider changes
  
  // Auto rotation for VTuber slider - every 4.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        vtuber: (prev.vtuber + 1) % 4
      }));
    }, 4500);
    
    return () => clearTimeout(timer);
  }, [currentSlides.vtuber]); // Only re-run when VTuber slider changes
  
  // Auto rotation for J-POP slider - every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        jpop: (prev.jpop + 1) % 4
      }));
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentSlides.jpop]); // Only re-run when J-POP slider changes
  
  // Auto rotation for Game slider - every 5.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlides(prev => ({
        ...prev,
        game: (prev.game + 1) % 4
      }));
    }, 5500);
    
    return () => clearTimeout(timer);
  }, [currentSlides.game]); // Only re-run when Game slider changes

  // Handle hover functions for interest sliders (exclude auto sliders)
  const handleMouseEnter = (category) => {
    // Skip for auto-rotating categories
    if (category === 'anime' || category === 'it' || category === 'manga' || category === 'vtuber' || category === 'jpop' || category === 'game') return;
    
    // Clear any existing interval for this category
    if (intervalRefs.current[category]) {
      clearInterval(intervalRefs.current[category]);
    }
    
    // Set up an interval to cycle through images
    intervalRefs.current[category] = setInterval(() => {
      setCurrentSlides(prev => ({
        ...prev,
        [category]: (prev[category] + 1) % interestSliders[category].length
      }));
    }, 1000); // Change image every second
  };

  const handleMouseLeave = (category) => {
    // Skip for auto-rotating categories
    if (category === 'anime' || category === 'it' || category === 'manga' || category === 'vtuber' || category === 'jpop' || category === 'game') return;
    
    // Clear the interval when mouse leaves
    if (intervalRefs.current[category]) {
      clearInterval(intervalRefs.current[category]);
      intervalRefs.current[category] = null;
    }
    
    // Reset to first image
    setCurrentSlides(prev => ({
      ...prev,
      [category]: 0
    }));
  };

  // Clean up all intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className="about-container">
      {/* Floating diamonds for visual effect */}
      <div className="floating-diamond floating-diamond-1"></div>
      <div className="floating-diamond floating-diamond-2"></div>
      <div className="floating-diamond floating-diamond-3"></div>
      <div className="floating-diamond floating-diamond-4"></div>
      <div className="floating-diamond floating-diamond-5"></div>
      <div className="floating-diamond floating-diamond-6"></div>
      <div className="floating-diamond floating-diamond-7"></div>
      
      <div className="about-content" style={{ padding: '6rem 2rem 4rem' }}>
        <div className="about-button-container">
          <div className="about-button">
            About
          </div>
        </div>
        
        <div ref={quoteRef} className={`about-quote ${quoteVisible ? 'fade-in' : ''}`}>
          <p>Favourite Quote</p>
          <p>"Listen Simon, Don't forget this.Don't believe in the Kamina who you believe in. Don't believe in the Simon that I believe in. Believe in the you who believes in yourself." </p>
          <p> - Kamina From Gurren Lagann</p>
        </div>
        
        <div ref={profileRef} className={`profile-section ${profileVisible ? 'fade-in' : ''}`}>
          <div className="profile-button-container">
            <div className="profile-button">
              Profile
            </div>
          </div>
          
          <div className="profile-card">
            <div className="centered-container">
              <div className="profile-flex">
                {/* Profile Image */}
                <div className="profile-image-container">
                  <img src={profilePic} alt="Sarttra Prasongtichol" className="profile-image" />
                </div>
                
                {/* Profile Details */}
                <div className="profile-details">
                  <div className="profile-text">
                    <p><strong>Name:</strong> Sarttra Prasongtichol</p>
                    <p><strong>Nickname:</strong> Blue</p>
                    <p><strong>Birthdate:</strong> 30 June 2002</p>
                    <p><strong>Zodiac:</strong> Gemini ( TH ), Cancer (International)</p>
                    <p><strong>Personality:</strong> ENFP 3w2</p>
                    <p><strong>Hobby:</strong> Playing Internet, Drawing, Video Editing</p>
                    <p><strong>Dream:</strong> Become Ado(Japanese Singer)'s friend in one day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Education Section */}
        <div ref={educationRef} className={`education-section ${educationVisible ? 'fade-in' : ''}`}>
          <div className="education-button-container">
            <div className="education-button">
              Education
            </div>
          </div>
          
          <div className="education-card">
            <div className="centered-container">
              <div className="education-entries">
                {/* University */}
                <div className="education-entry">
                  <div className="education-logo-container">
                    <img src={ictLogo} alt="Mahidol University ICT" className="education-logo" />
                  </div>
                  <div className="education-details">
                    <p className="education-title">2021-2025   University: Mahidol University,</p>
                    <p className="education-info">Bachelor of Science Faculty of Information and Communication Technology</p>
                    <p className="education-info">Major: Software Engineering</p>
                    <p className="education-info">GPA: 3.02 / 4.00</p>
                  </div>
                </div>
                
                <div className="education-divider"></div>
                
                {/* High School */}
                <div className="education-entry">
                  <div className="education-logo-container">
                    <img src={sgLogo} alt="Saint Gabriel's College" className="education-logo" />
                  </div>
                  <div className="education-details">
                    <p className="education-title">2009-2020   School: Saint Gabriel's College</p>
                    <p className="education-info">Major: Math, Science</p>
                    <p className="education-info">Track: International Science</p>
                    <p className="education-info">GPA: 3.32 / 4.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div ref={skillsRef} className={`about-skills-section ${skillsVisible ? 'fade-in' : ''}`}>
          <div className="about-skills-button-container">
            <div className="about-skills-button">
              Skills
            </div>
          </div>
          
          <div className="about-skills-card">
            <div className="centered-container">
              {isMobile ? (
                // Mobile Skills Display with small progress bars
                <div className="mobile-skills-container">
                  <MobileSkillItem name="Tech Skills" percentage="80%" skillType="tech" isVisible={skillsVisible} />
                  <MobileSkillItem name="Art Skills" percentage="65%" skillType="art" isVisible={skillsVisible} />
                  <MobileSkillItem 
                    name={<>
                      <span className="mobile-multiline-skill">
                        Editing and<br />Content Creator<br />Skills
                      </span>
                    </>} 
                    percentage="70%" 
                    skillType="editing" 
                    isVisible={skillsVisible} 
                  />
                  <div className="mobile-skill-divider"></div>
                  <MobileSkillItem name="Language Skills" percentage="68%" skillType="language" isVisible={skillsVisible} />
                  <MobileSkillItem 
                    name={<>
                      <span className="mobile-multiline-skill">
                        Communication and<br />Management Skills
                      </span>
                    </>} 
                    percentage="75%" 
                    skillType="management" 
                    isVisible={skillsVisible} 
                  />
                </div>
              ) : (
                // Desktop Skills Display with progress bars
                <>
                  {/* Tech Skills */}
                  <div className="about-skill-item">
                    <div className="about-skill-name">Tech Skills</div>
                    <div className="about-skill-bar">
                      <div className="about-skill-progress"></div>
                      <div className={`about-skill-fill tech ${skillsVisible ? 'animated' : ''}`}></div>
                    </div>
                    <div className="about-skill-percentage">80%</div>
                  </div>
                  
                  {/* Art Skills */}
                  <div className="about-skill-item">
                    <div className="about-skill-name">Art Skills</div>
                    <div className="about-skill-bar">
                      <div className="about-skill-progress"></div>
                      <div className={`about-skill-fill art ${skillsVisible ? 'animated' : ''}`}></div>
                    </div>
                    <div className="about-skill-percentage">65%</div>
                  </div>
                  
                  {/* Editing Skills */}
                  <div className="about-skill-item">
                    <div className="about-skill-name">Editing & Content Creator Skills</div>
                    <div className="about-skill-bar">
                      <div className="about-skill-progress"></div>
                      <div className={`about-skill-fill editing ${skillsVisible ? 'animated' : ''}`}></div>
                    </div>
                    <div className="about-skill-percentage">70%</div>
                  </div>
                  
                  {/* Language Skills */}
                  <div className="about-skill-item">
                    <div className="about-skill-name">Language Skills</div>
                    <div className="about-skill-bar">
                      <div className="about-skill-progress"></div>
                      <div className={`about-skill-fill language ${skillsVisible ? 'animated' : ''}`}></div>
                    </div>
                    <div className="about-skill-percentage">68%</div>
                  </div>
                  
                  {/* Communication and Management Skills */}
                  <div className="about-skill-item">
                    <div className="about-skill-name">Communication and Management Skills</div>
                    <div className="about-skill-bar">
                      <div className="about-skill-progress"></div>
                      <div className={`about-skill-fill management ${skillsVisible ? 'animated' : ''}`}></div>
                    </div>
                    <div className="about-skill-percentage">75%</div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Detailed Skills Card */}
          <div ref={detailedSkillsRef} className={`about-detailed-skills-card ${detailedSkillsVisible ? 'fade-in' : ''}`}>
            <div className="centered-container">
              <div className="about-skills-grid">
                {/* Left Column */}
                <div className="about-skills-column">
                  {/* Tech Skills */}
                  <div className="about-skill-category">
                    <div className="about-skill-category-title">
                      <span role="img" aria-label="tech" className="about-icon">💻</span> Tech Skills
                    </div>
                    
                    <div className="about-skill-subcategory">
                      <strong>Frontend</strong>
                      <ul className="about-skill-list">
                        <li>HTML & CSS, JavaScript</li>
                        <li>React.js, Vue.js, Next.js</li>
                        <li>Flutter, React Native</li>
                      </ul>
                    </div>
                    
                    <div className="about-skill-subcategory">
                      <strong>Backend & API</strong>
                      <ul className="about-skill-list">
                        <li>Node.js, WooCommerceAPI</li>
                        <li>Firebase, MySQL, MongoDB</li>
                      </ul>
                    </div>
                    
                    <div className="about-skill-subcategory">
                      <strong>Other Tools</strong>
                      <ul className="about-skill-list">
                        <li>Figma, JSON, TypeScript</li>
                        <li>Java, C, ObsidianMD, Office365</li>
                      </ul>
                    </div>
                  </div>

                  <div className="about-horizontal-divider"></div>
                  
                  {/* Editing Skills */}
                  <div className="about-skill-category">
                    <div className="about-skill-category-title">
                      <span role="img" aria-label="editing" className="about-icon">🎬</span> 
                      <span className="skill-title-text">
                        <span className="desktop-only">Editing & Content Creator Skills</span>
                        <span className="mobile-only">Editing and<br />Content Creator<br />Skills</span>
                      </span>
                    </div>
                    <ul className="about-skill-list">
                      <li>Adobe Premiere Pro</li>
                      <li>DaVinci Resolve</li>
                      <li>Adobe Audition</li>
                      <li>Cakewalk by Bandlab</li>
                      <li>Audacity</li>
                    </ul>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="about-skills-column">
                  {/* For mobile view - add clear separation */}
                  <div className="mobile-only-divider"></div>

                  {/* Art Skills */}
                  <div className="about-skill-category">
                    <div className="about-skill-category-title">
                      <span role="img" aria-label="art" className="about-icon">🎨</span> Art Skills
                    </div>
                    <ul className="about-skill-list">
                      <li>Drawing / Illustration</li>
                      <li>Clip Studio Paint</li>
                      <li>Manga & Chibi Style</li>
                      <li>Adobe Photoshop</li>
                      <li>Graphic Design</li>
                      <li>UX/UI Design</li>
                    </ul>
                  </div>

                  <div className="about-horizontal-divider"></div>
                  
                  {/* Language Skills */}
                  <div className="about-skill-category">
                    <div className="about-skill-category-title">
                      <span role="img" aria-label="language" className="about-icon">🌐</span> Language Skills
                    </div>
                    <ul className="about-skill-list">
                      <li>Thai ( Native )</li>
                      <li>English (Conversational)</li>
                      <li>Japanese (Intermediate - learning)</li>
                    </ul>
                  </div>

                  <div className="about-horizontal-divider"></div>
                  
                  {/* Communication and Management Skills */}
                  <div className="about-skill-category">
                    <div className="about-skill-category-title">
                      <span role="img" aria-label="management" className="about-icon">🧠</span> 
                      <span className="skill-title-text">
                        <span className="desktop-only">Communication and Management Skills</span>
                        <span className="mobile-only">Communication and<br />Management Skills</span>
                      </span>
                    </div>
                    <ul className="about-skill-list">
                      <li>Creative</li>
                      <li>Responsible</li>
                      <li>Strong communicator</li>
                      <li>Excellent time management</li>
                      <li>Excellent problem solving</li>
                      <li>Good Conflict Management</li>
                      <li>High analytics skill</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interests Section */}
        <div ref={interestsRef} className={`about-interests-section ${interestsVisible ? 'fade-in' : ''}`}>
          <div className="about-interests-button-container">
            <div className="about-interests-button">
              Interests
            </div>
          </div>
          
          <div className="about-interests-card">
            <div className="centered-container">
              <div className="about-interests-grid">
                {/* IT */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* React Slider */}
                      <div 
                        key="react"
                        className={`about-interest-slide ${currentSlides.it === 0 ? 'active' : currentSlides.it === 3 ? 'next' : ''}`}
                      >
                        <img src={reactTSlider} alt="IT - React" />
                      </div>
                      
                      {/* ChatGPT Slider */}
                      <div 
                        key="chatgpt"
                        className={`about-interest-slide ${currentSlides.it === 1 ? 'active' : currentSlides.it === 0 ? 'next' : ''}`}
                      >
                        <img src={chatgptTSlider} alt="IT - ChatGPT" />
                      </div>
                      
                      {/* Flutter Slider */}
                      <div 
                        key="flutter"
                        className={`about-interest-slide ${currentSlides.it === 2 ? 'active' : currentSlides.it === 1 ? 'next' : ''}`}
                      >
                        <img src={flutterTSlider} alt="IT - Flutter" />
                      </div>
                      
                      {/* Figma Slider */}
                      <div 
                        key="figma"
                        className={`about-interest-slide ${currentSlides.it === 3 ? 'active' : currentSlides.it === 2 ? 'next' : ''}`}
                      >
                        <img src={figmaTSlider} alt="IT - Figma" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">IT</div>
                  <div className="interest-links-container">
                    {currentSlides.it === 0 && (
                      <a 
                        href="https://reactjs.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Learn React
                      </a>
                    )}
                    {currentSlides.it === 1 && (
                      <a 
                        href="https://openai.com/chatgpt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Try ChatGPT
                      </a>
                    )}
                    {currentSlides.it === 2 && (
                      <a 
                        href="https://flutter.dev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Explore Flutter
                      </a>
                    )}
                    {currentSlides.it === 3 && (
                      <a 
                        href="https://figma.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Try Figma
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Anime */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* Kusuri Slider */}
                      <div 
                        key="kusuri"
                        className={`about-interest-slide ${currentSlides.anime === 0 ? 'active' : currentSlides.anime === 3 ? 'next' : ''}`}
                      >
                        <img src={kusuriASlider} alt="Anime - kusuri" />
                      </div>
                      
                      {/* Naruto Slider */}
                      <div 
                        key="naruto"
                        className={`about-interest-slide ${currentSlides.anime === 1 ? 'active' : currentSlides.anime === 0 ? 'next' : ''}`}
                      >
                        <img src={narutoASlider} alt="Anime - naruto" />
                      </div>
                      
                      {/* Lookback Slider */}
                      <div 
                        key="lookback"
                        className={`about-interest-slide ${currentSlides.anime === 2 ? 'active' : currentSlides.anime === 1 ? 'next' : ''}`}
                      >
                        <img src={lookbackASlider} alt="Anime - lookback" />
                      </div>
                      
                      {/* Bocchi Slider */}
                      <div 
                        key="bocchi"
                        className={`about-interest-slide ${currentSlides.anime === 3 ? 'active' : currentSlides.anime === 2 ? 'next' : ''}`}
                      >
                        <img src={bocchiASlider} alt="Anime - bocchi" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">Anime</div>
                  <div className="interest-links-container">
                    {currentSlides.anime === 0 && (
                      <a 
                        href="https://youtu.be/3lfb_KeqdEM?si=9ZvdVQf3pZkmQd4L" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Watch Kusuri
                      </a>
                    )}
                    {currentSlides.anime === 1 && (
                      <a 
                        href="https://youtu.be/yKELA1qBAKA?si=2WfuEJGJZUHuXhO2" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Watch Naruto
                      </a>
                    )}
                    {currentSlides.anime === 2 && (
                      <a 
                        href="https://youtu.be/rCQ5iW20xz4?si=6M41jbWPbJxna1Wz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Watch Lookback
                      </a>
                    )}
                    {currentSlides.anime === 3 && (
                      <a 
                        href="https://youtu.be/QVEe53SdVUQ?si=O8Ofpe2_Q22bLWGB" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Watch Bocchi
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Manga */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* MHA Slider */}
                      <div 
                        key="mha"
                        className={`about-interest-slide ${currentSlides.manga === 0 ? 'active' : currentSlides.manga === 3 ? 'next' : ''}`}
                      >
                        <img src={mhaMSlider} alt="Manga - MHA" />
                      </div>
                      
                      {/* Chainsaw Slider */}
                      <div 
                        key="chainsaw"
                        className={`about-interest-slide ${currentSlides.manga === 1 ? 'active' : currentSlides.manga === 0 ? 'next' : ''}`}
                      >
                        <img src={chainsawMSlider} alt="Manga - Chainsaw Man" />
                      </div>
                      
                      {/* Oshi Slider */}
                      <div 
                        key="oshi"
                        className={`about-interest-slide ${currentSlides.manga === 2 ? 'active' : currentSlides.manga === 1 ? 'next' : ''}`}
                      >
                        <img src={oshiMSlider} alt="Manga - Oshi no Ko" />
                      </div>
                      
                      {/* Fireforce Slider */}
                      <div 
                        key="fireforce"
                        className={`about-interest-slide ${currentSlides.manga === 3 ? 'active' : currentSlides.manga === 2 ? 'next' : ''}`}
                      >
                        <img src={fireforceMSlider} alt="Manga - Fire Force" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">Manga</div>
                  <div className="interest-links-container">
                    {currentSlides.manga === 0 && (
                      <a 
                        href="https://mangaplus.shueisha.co.jp/titles/100080" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Read MHA
                      </a>
                    )}
                    {currentSlides.manga === 1 && (
                      <a 
                        href="https://mangaplus.shueisha.co.jp/titles/100037" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Read Chainsaw Man
                      </a>
                    )}
                    {currentSlides.manga === 2 && (
                      <a 
                        href="https://mangaplus.shueisha.co.jp/titles/100191" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Read Oshi no Ko
                      </a>
                    )}
                    {currentSlides.manga === 3 && (
                      <a 
                        href="https://www.vibulkijshop.com/category/48" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Read Fire Force
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Game */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* Silent Hill f Slider */}
                      <div 
                        key="silenthillf"
                        className={`about-interest-slide ${currentSlides.game === 0 ? 'active' : currentSlides.game === 3 ? 'next' : ''}`}
                      >
                        <img src={silenthillfGSlider} alt="Game - Silent Hill f" />
                      </div>
                      
                      {/* Star Rail Slider */}
                      <div 
                        key="starrail"
                        className={`about-interest-slide ${currentSlides.game === 1 ? 'active' : currentSlides.game === 0 ? 'next' : ''}`}
                      >
                        <img src={starrailGSlider} alt="Game - Star Rail" />
                      </div>
                      
                      {/* Valorant Slider */}
                      <div 
                        key="valorant"
                        className={`about-interest-slide ${currentSlides.game === 2 ? 'active' : currentSlides.game === 1 ? 'next' : ''}`}
                      >
                        <img src={valorantGSlider} alt="Game - Valorant" />
                      </div>
                      
                      {/* REPO Slider */}
                      <div 
                        key="repo"
                        className={`about-interest-slide ${currentSlides.game === 3 ? 'active' : currentSlides.game === 2 ? 'next' : ''}`}
                      >
                        <img src={repoGSlider} alt="Game - REPO" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">Game</div>
                  <div className="interest-links-container">
                    {currentSlides.game === 0 && (
                      <a 
                        href="https://store.steampowered.com/app/2947440/SILENT_HILL_f/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Silent Hill f
                      </a>
                    )}
                    {currentSlides.game === 1 && (
                      <a 
                        href="https://hsr.hoyoverse.com/th-th/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Honakai Star Rail
                      </a>
                    )}
                    {currentSlides.game === 2 && (
                      <a 
                        href="https://playvalorant.com/th-th/download/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Valorant
                      </a>
                    )}
                    {currentSlides.game === 3 && (
                      <a 
                        href="https://store.steampowered.com/app/3241660/REPO/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        REPO
                      </a>
                    )}
                  </div>
                </div>
                
                {/* VTuber */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* Suisei Slider */}
                      <div 
                        key="suisei"
                        className={`about-interest-slide ${currentSlides.vtuber === 0 ? 'active' : currentSlides.vtuber === 3 ? 'next' : ''}`}
                      >
                        <img src={suiseiVSlider} alt="VTuber - Suisei" />
                      </div>
                      
                      {/* Raden Slider */}
                      <div 
                        key="raden"
                        className={`about-interest-slide ${currentSlides.vtuber === 1 ? 'active' : currentSlides.vtuber === 0 ? 'next' : ''}`}
                      >
                        <img src={radenVSlider} alt="VTuber - Raden" />
                      </div>
                      
                      {/* ZONA Slider */}
                      <div 
                        key="zona"
                        className={`about-interest-slide ${currentSlides.vtuber === 2 ? 'active' : currentSlides.vtuber === 1 ? 'next' : ''}`}
                      >
                        <img src={zonaVSlider} alt="VTuber - ZONA" />
                      </div>
                      
                      {/* Kyo Slider */}
                      <div 
                        key="kyo"
                        className={`about-interest-slide ${currentSlides.vtuber === 3 ? 'active' : currentSlides.vtuber === 2 ? 'next' : ''}`}
                      >
                        <img src={kyoVSlider} alt="VTuber - Kyo" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">VTuber</div>
                  <div className="interest-links-container">
                    {currentSlides.vtuber === 0 && (
                      <a 
                        href="https://www.youtube.com/@HoshimachiSuisei" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Suisei's Channel
                      </a>
                    )}
                    {currentSlides.vtuber === 1 && (
                      <a 
                        href="https://www.youtube.com/@JuufuuteiRaden" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Raden's Channel
                      </a>
                    )}
                    {currentSlides.vtuber === 2 && (
                      <a 
                        href="https://www.youtube.com/@ZONAPLG" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        ZONA's Channel
                      </a>
                    )}
                    {currentSlides.vtuber === 3 && (
                      <a 
                        href="https://www.youtube.com/@Kyo_Hanabasami" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Kyo's Channel
                      </a>
                    )}
                  </div>
                </div>
                
                {/* J-POP */}
                <div className="about-interest-item">
                  <div className="about-interest-slider-container auto-slider">
                    <div className="about-interest-slider">
                      {/* Ado Slider */}
                      <div 
                        key="ado"
                        className={`about-interest-slide ${currentSlides.jpop === 0 ? 'active' : currentSlides.jpop === 3 ? 'next' : ''}`}
                      >
                        <img src={adoJSlider} alt="J-POP - Ado" />
                      </div>
                      
                      {/* Natori Slider */}
                      <div 
                        key="natori"
                        className={`about-interest-slide ${currentSlides.jpop === 1 ? 'active' : currentSlides.jpop === 0 ? 'next' : ''}`}
                      >
                        <img src={natoriJSlider} alt="J-POP - Natori" />
                      </div>
                      
                      {/* Kyo-JPOP Slider */}
                      <div 
                        key="kyojpop"
                        className={`about-interest-slide ${currentSlides.jpop === 2 ? 'active' : currentSlides.jpop === 1 ? 'next' : ''}`}
                      >
                        <img src={kyoJpopSlider} alt="J-POP - Kyo" />
                      </div>
                      
                      {/* Lana Slider */}
                      <div 
                        key="lana"
                        className={`about-interest-slide ${currentSlides.jpop === 3 ? 'active' : currentSlides.jpop === 2 ? 'next' : ''}`}
                      >
                        <img src={lalalaloveJSlider} alt="J-POP - Lana" />
                      </div>
                    </div>
                  </div>
                  <div className="about-interest-title">J-POP</div>
                  <div className="interest-links-container">
                    {currentSlides.jpop === 0 && (
                      <a 
                        href="https://youtu.be/Qp3b-RXtz4w?si=bdsBRDd2oggN6U_W" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Ado's Music
                      </a>
                    )}
                    {currentSlides.jpop === 1 && (
                      <a 
                        href="https://youtu.be/4Pls29qqg6Y?si=o8QIf-Yzl7KdZXaI" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Natori's Music
                      </a>
                    )}
                    {currentSlides.jpop === 2 && (
                      <a 
                        href="https://youtu.be/gY81sRHjLEA?si=RDiHuKImMUKWf5bA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Kyo's Music
                      </a>
                    )}
                    {currentSlides.jpop === 3 && (
                      <a 
                        href="https://youtu.be/XPLkkdMFmco?si=BFne2SFLcGscHrqo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="interest-direct-link"
                      >
                        Lana's Music
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;