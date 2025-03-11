// AchievementContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AchievementNotification from './AchievementNotification';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

export const AchievementProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState({
    unlocked: [],
    inProgress: [],
    locked: []
  });
  const [stats, setStats] = useState({
    total: 0,
    unlocked: 0,
    inProgress: 0,
    locked: 0,
    completionRate: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  const checkAuthentication = useCallback(async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Auth check - Token available:', !!token);
      
      if (!token) {
        setIsAuthenticated(false);
        return false;
      }
      
      // Make a request to verify authentication status
      const response = await fetch('http://localhost:3001/api/auth/me', {
        method: 'GET',
        credentials: 'include', // Important for sending cookies
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const isAuth = response.ok;
      console.log('Auth check result:', isAuth);
      setIsAuthenticated(isAuth);
      return isAuth;
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Function to fetch achievements
  const fetchAchievements = useCallback(async () => {
    // Check authentication first
    const isAuth = await checkAuthentication();
    if (!isAuth) {
      // Don't show error in console, just set the state
      setError('Authentication required');
      setIsLoading(false);
      return false;
    }
    
    try {
      setIsLoading(true);
      console.log('Fetching achievements...');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch('http://localhost:3001/api/achievements', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // Important for sending cookies
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Session expired or invalid
          setIsAuthenticated(false);
          localStorage.removeItem('token'); // Clear invalid token
          setError('Session expired. Please log in again.');
          console.error('Authentication error: Session expired');
          return false;
        }
        
        const errorText = await response.text();
        console.error('Server response error:', response.status, errorText);
        throw new Error(`Failed to fetch achievements: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Achievement data received:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch achievements');
      }
      
      setAchievements({
        unlocked: data.data.unlocked || [],
        inProgress: data.data.inProgress || [],
        locked: data.data.locked || []
      });
      
      setStats(data.data.stats || {
        total: 0,
        unlocked: 0,
        inProgress: 0,
        locked: 0,
        completionRate: 0
      });
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError('Failed to load achievements. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checkAuthentication]);

  // Function to show achievement notification
  const showAchievementNotification = useCallback((achievement) => {
    // Generate a unique ID for this notification
    const id = Date.now().toString();
    
    // Add notification to the queue
    setNotifications(prev => [...prev, { id, achievement }]);
    
    // Play sound if browser supports it
    if (typeof Audio !== 'undefined') {
      try {
        const notificationSound = new Audio('/notification.mp3');
        notificationSound.volume = 0.5;
        notificationSound.play().catch(() => {
          // Ignore errors from autoplay restrictions
        });
      } catch (soundError) {
        // Ignore sound errors completely
      }
      
      return id;
    }
  }, []);
  
  // Function to remove notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Check for new achievements
  const checkForNewAchievements = useCallback(async () => {
    // Check authentication first
    const isAuth = await checkAuthentication();
    if (!isAuth) {
      console.log('Not authenticated, skipping achievement check');
      return false;
    }
    
    try {
      console.log('Checking for new achievements...');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return false;
      }
      
      const response = await fetch('http://localhost:3001/api/achievements/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // Important for sending cookies
      });
      
      if (!response.ok) {
        console.error('Error checking achievements:', response.status);
        const errorText = await response.text();
        console.error('Error details:', errorText);
        return false;
      }
      
      const data = await response.json();
      console.log('Achievement check response:', data);
      
      if (data.success && data.data && data.data.newAchievements && data.data.newAchievements.length > 0) {
        // Show notifications for new achievements
        data.data.newAchievements.forEach(achievement => {
          showAchievementNotification(achievement);
        });
        
        // Refresh achievements list
        fetchAchievements();
        
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error checking for new achievements:', err);
      return false;
    }
  }, [checkAuthentication, fetchAchievements, showAchievementNotification]);

  // Listen for achievement updates from goal completion
  useEffect(() => {
    const handleAchievementUpdate = () => {
      console.log('Achievement update event received, refreshing achievements');
      checkForNewAchievements().then(result => {
        if (result) {
          // If new achievements were found, refresh the achievements list
          fetchAchievements();
        }
      });
    };
    
    // Add event listener
    window.addEventListener('achievementUpdate', handleAchievementUpdate);
    
    // Clean up
    return () => {
      window.removeEventListener('achievementUpdate', handleAchievementUpdate);
    };
  }, [checkForNewAchievements, fetchAchievements]);

  // Initial fetch on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
    }
  }, [isAuthenticated, fetchAchievements]);

  // Provide context value
  const value = {
    achievements,
    stats,
    isLoading,
    error,
    isAuthenticated,
    fetchAchievements,
    checkForNewAchievements,
    showAchievementNotification,
    notifications,
    removeNotification
  };

  return (
    <AchievementContext.Provider value={value}>
      {children}
      
      {/* Achievement Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {notifications.map(({ id, achievement }) => (
          <AchievementNotification
            key={id}
            achievement={achievement}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    </AchievementContext.Provider>
  );
};

AchievementProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AchievementProvider;