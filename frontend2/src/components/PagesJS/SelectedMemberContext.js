import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Create context to manage selected member state
const SelectedMemberContext = createContext();

export const SelectedMemberProvider = ({ children }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [movies, setMovies] = useState([]); // State to hold the list of movies
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to handle member changes and send them to backend
  useEffect(() => {
    // Function to send selectedMember to the backend when it changes
    const sendSelectedMemberToBackend = async () => {
      try {
        // POST request to send selectedMember data to the backend
        const response = await fetch('http://localhost:3001/api/updateSelectedMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedMember }), // Send the selected member
        });
  
        if (!response.ok) {
          throw new Error('Failed to send selected member to backend');
        }
      } catch (error) {
        console.error('Error sending selected member:', error);
      }
    };
  
    // Call the function to send data
    sendSelectedMemberToBackend();
  }, [selectedMember]); // Trigger when selectedMember changes

  // Function to fetch all movies from the backend
  const fetchAllMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/movies');
      const data = await response.json();
      if (response.ok) {
        setMovies(data.data); // Update the movies state with the fetched movies
      } else {
        throw new Error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    const handleNavigation = (e) => {
      const targetPath = e.target.getAttribute?.('href'); // Safely retrieve 'href'

      if (targetPath) {
        if (location.pathname === '/films' && targetPath === '/films') {
          // Call the API to refill movies when clicking "films" again
          setSelectedMember(null); // Reset selected member
          
          
        } else if (
          !targetPath.startsWith('/films') &&
          !targetPath.startsWith('/filmonly') &&
          !targetPath.startsWith('/reviews') // Reset context for navigation to the "reviews" page
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
    <SelectedMemberContext.Provider value={{ selectedMember, setSelectedMember, movies }}>
      {children}
    </SelectedMemberContext.Provider>
  );
};

export const useSelectedMember = () => useContext(SelectedMemberContext);
