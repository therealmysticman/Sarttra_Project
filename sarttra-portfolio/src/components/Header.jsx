import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Active link class for desktop NavLink
  const activeClass = ({ isActive }) => 
    isActive ? "font-bold active" : "hover:font-semibold transition duration-300";

  return (
    <header className="header">
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={activeClass} end>HOME</NavLink>
          <NavLink to="/about" className={activeClass}>ABOUT</NavLink>
          <NavLink to="/portfolio" className={activeClass}>PORTFOLIO</NavLink>
          <NavLink to="/contact" className={activeClass}>CONTACT</NavLink>
        </nav>
          
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <div className="mobile-nav-links">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "active" 
                    : ""
                }
                onClick={() => setIsMenuOpen(false)}
                end
              >
                HOME
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive 
                    ? "active" 
                    : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </NavLink>
              <NavLink 
                to="/portfolio" 
                className={({ isActive }) => 
                  isActive 
                    ? "active" 
                    : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >
                PORTFOLIO
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive 
                    ? "active" 
                    : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 