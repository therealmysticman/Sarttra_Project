import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the current path
    const { pathname } = location;
    
    // Set the title based on the current path
    let title = "Sarttra's World";
    
    if (pathname === "/") {
      title = "Home | Sarttra's World";
    } else if (pathname === "/about") {
      title = "About | Sarttra's World";
    } else if (pathname === "/portfolio") {
      title = "Portfolio | Sarttra's World";
    } else if (pathname === "/contact") {
      title = "Contact | Sarttra's World";
    }
    
    // Update the document title
    document.title = title;
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default PageTitle; 