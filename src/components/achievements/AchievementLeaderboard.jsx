import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import { useAchievements } from './AchievementContext';

const AchievementLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAchievements();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        const response = await fetch('http://localhost:3001/api/achievements/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Important for sending cookies
        });
    
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication required');
          }
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }
    
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch leaderboard');
        }
        
        setLeaderboard(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isAuthenticated]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800 animate-pulse">
        <div className="h-6 bg-neutral-800 rounded w-3/4 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 mb-4">
            <div className="h-8 w-8 bg-neutral-800 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-6 bg-neutral-800 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  // Render not authenticated state
  if (!isAuthenticated) {
    return (
      <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
        <p className="text-neutral-400 text-center">Please log in to view the leaderboard</p>
      </div>
    );
  }

  // Render empty state
  if (leaderboard.length === 0) {
    return (
      <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
        <p className="text-neutral-400 text-center">No leaderboard data available</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <FiTrendingUp className="mr-2 text-emerald-500" />
          Achievement Leaders
        </h2>
      </div>
      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            {/* Rank */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 
                index === 1 ? 'bg-neutral-400/20 text-neutral-300' : 
                  index === 2 ? 'bg-amber-600/20 text-amber-500' : 
                    'bg-neutral-800 text-neutral-400'}`}
            >
              {index + 1}
            </div>
            
            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user.username}</p>
              <p className="text-xs text-neutral-400">
                {user.achievementCount} achievements
              </p>
            </div>
            
            {/* Score */}
            <div className="flex-shrink-0 text-[#00F0FF] font-bold">
              <FiAward className="text-emerald-500 mr-1" />
              {user.totalXP}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementLeaderboard;