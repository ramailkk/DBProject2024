import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SelectedMemberContext = createContext();

export const SelectedMemberProvider = ({ children }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = (e) => {
      const targetPath = e.target.getAttribute?.('href'); // Safely retrieve 'href'

      if (targetPath) {
        if (location.pathname === '/films' && targetPath === '/films') {
          // Reset context if clicking on the "films" link while already on "/films"
          setSelectedMember(null);
        } else if (
          !targetPath.startsWith('/films') &&
          !targetPath.startsWith('/filmonly')
        ) {
          // Reset context for navigation to other routes
          setSelectedMember(null);
        }
      }
    };

    // Attach listener for link clicks
    document.body.addEventListener('click', handleNavigation);

    return () => {
      // Clean up listener on unmount
      document.body.removeEventListener('click', handleNavigation);
    };
  }, [location]);

  return (
    <SelectedMemberContext.Provider value={{ selectedMember, setSelectedMember }}>
      {children}
    </SelectedMemberContext.Provider>
  );
};

export const useSelectedMember = () => useContext(SelectedMemberContext);
