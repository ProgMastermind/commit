import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiAward, FiLock, FiClock, FiChevronDown, FiChevronUp, FiRefreshCw } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import AchievementLeaderboard from '../components/achievements/AchievementLeaderboard';
import AchievementCard from '../components/achievements/AchievementCard';
import { useAchievements } from '../components/achievements/AchievementContext';

const Achievements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRarity, setFilterRarity] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Use the achievement context for state management
  const { 
    achievements = { unlocked: [], inProgress: [], locked: [] },
    stats = { total: 0, unlocked: 0, inProgress: 0, locked: 0, completionRate: 0 },
    isLoading = false,
    error = null,
    isAuthenticated = false,
    fetchAchievements,
    checkForNewAchievements,
    showAchievementNotification = () => {}
  } = useAchievements() || {};

  // Fetch achievements data when component mounts or authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
      // Also check for any new achievements
      checkForNewAchievements();
    }
  }, [isAuthenticated, fetchAchievements, checkForNewAchievements]);

  // Handle refresh button click
  const handleRefresh = async () => {
    if (isAuthenticated && !isRefreshing) {
      setIsRefreshing(true);
      await fetchAchievements();
      setTimeout(() => setIsRefreshing(false), 1000); // Minimum animation time
    }
  };

  // Filter achievements based on search, category, and rarity
  const filteredAchievements = useMemo(() => {
    let filtered = [];
    
    if (activeTab === 'all') {
      filtered = [...(achievements.unlocked || []), ...(achievements.inProgress || []), ...(achievements.locked || [])];
    } else if (activeTab === 'unlocked') {
      filtered = [...(achievements.unlocked || [])];
    } else if (activeTab === 'in-progress') {
      filtered = [...(achievements.inProgress || [])];
    } else if (activeTab === 'locked') {
      filtered = [...(achievements.locked || [])];
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(achievement => 
        achievement.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(achievement => 
        achievement.category === filterCategory
      );
    }
    
    // Apply rarity filter
    if (filterRarity !== 'all') {
      filtered = filtered.filter(achievement => 
        achievement.rarity === filterRarity
      );
    }
    
    return filtered;
  }, [achievements, activeTab, searchQuery, filterCategory, filterRarity]);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const allAchievements = [
      ...(achievements.unlocked || []), 
      ...(achievements.inProgress || []), 
      ...(achievements.locked || [])
    ];
    const categorySet = new Set(allAchievements.map(a => a.category).filter(Boolean));
    return ['all', ...Array.from(categorySet)];
  }, [achievements]);

  // Get unique rarities for filter dropdown
  const rarities = useMemo(() => {
    const allAchievements = [
      ...(achievements.unlocked || []), 
      ...(achievements.inProgress || []), 
      ...(achievements.locked || [])
    ];
    const raritySet = new Set(allAchievements.map(a => a.rarity).filter(Boolean));
    return ['all', ...Array.from(raritySet)];
  }, [achievements]);

  // Group achievements by category for display
  const achievementsByCategory = useMemo(() => {
    const grouped = {};
    
    filteredAchievements.forEach(achievement => {
      const category = achievement.category || 'uncategorized';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(achievement);
    });
    
    return grouped;
  }, [filteredAchievements]);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Initialize all categories as expanded
  useEffect(() => {
    const initialExpanded = {};
    Object.keys(achievementsByCategory).forEach(category => {
      initialExpanded[category] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [achievementsByCategory]);

  // Format category name for display
  const formatCategoryName = (category) => {
    if (category === 'uncategorized') return 'Uncategorized';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8 relative">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-amber-500/20 rounded-full blur-3xl opacity-30" />
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Achievements</h1>
            <p className="text-neutral-400 mt-1">Track your progress and unlock rewards</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="bg-[#111111] hover:bg-[#1a1a1a] text-white p-2 rounded-full border border-neutral-800 transition-colors"
            aria-label="Refresh achievements"
          >
            <FiRefreshCw className={`text-xl ${isRefreshing ? 'animate-spin text-[#00F0FF]' : 'text-neutral-400'}`} />
          </motion.button>
        </div>
      </header>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
        >
          <p className="text-neutral-400">Total Achievements</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <div className="w-full h-1 bg-neutral-800 mt-4">
            <div className="h-full bg-white" style={{ width: '100%' }}></div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-emerald-700 transition-all"
        >
          <p className="text-neutral-400">Unlocked</p>
          <p className="text-3xl font-bold text-emerald-500">{stats.unlocked}</p>
          <div className="w-full h-1 bg-neutral-800 mt-4">
            <div className="h-full bg-emerald-500" style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}></div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-amber-700 transition-all"
        >
          <p className="text-neutral-400">In Progress</p>
          <p className="text-3xl font-bold text-amber-500">{stats.inProgress}</p>
          <div className="w-full h-1 bg-neutral-800 mt-4">
            <div className="h-full bg-amber-500" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}></div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-[#00F0FF] transition-all"
        >
          <p className="text-neutral-400">Completion Rate</p>
          <p className="text-3xl font-bold text-[#00F0FF]">{stats.completionRate}%</p>
          <div className="w-full h-1 bg-neutral-800 mt-4">
            <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]" style={{ width: `${stats.completionRate}%` }}></div>
          </div>
        </motion.div>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Authentication Check */}
          {!isAuthenticated ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl p-8 border border-neutral-800 text-center"
            >
              <FiLock className="mx-auto text-4xl text-neutral-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
              <p className="text-neutral-400 mb-4">Please log in to view your achievements</p>
            </motion.div>
          ) : isLoading ? (
            <div className="bg-[#111111] rounded-xl p-8 border border-neutral-800">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-neutral-800 rounded w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-40 bg-neutral-800 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl p-8 border border-neutral-800 text-center"
            >
              <p className="text-red-400">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <>
              {/* Search and Filter */}
              <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search achievements..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative">
                      <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-[#0a0a0a] border border-neutral-800 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:border-[#00F0FF] appearance-none"
                      >
                        <option value="all">All Categories</option>
                        {categories.filter(c => c !== 'all').map(category => (
                          <option key={category} value={category}>
                            {formatCategoryName(category)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="relative">
                      <select
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                        className="bg-[#0a0a0a] border border-neutral-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#00F0FF] appearance-none"
                      >
                        <option value="all">All Rarities</option>
                        {rarities.filter(r => r !== 'all').map(rarity => (
                          <option key={rarity} value={rarity}>
                            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-neutral-800 mt-6 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'all' ? 'text-[#00F0FF] border-b-2 border-[#00F0FF]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    onClick={() => setActiveTab('unlocked')}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'unlocked' ? 'text-[#00F0FF] border-b-2 border-[#00F0FF]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    <FiAward className="inline mr-1" />
                    Unlocked ({stats.unlocked})
                  </button>
                  <button
                    onClick={() => setActiveTab('in-progress')}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'in-progress' ? 'text-[#00F0FF] border-b-2 border-[#00F0FF]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    <FiClock className="inline mr-1" />
                    In Progress ({stats.inProgress})
                  </button>
                  <button
                    onClick={() => setActiveTab('locked')}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'locked' ? 'text-[#00F0FF] border-b-2 border-[#00F0FF]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    <FiLock className="inline mr-1" />
                    Locked ({stats.total - stats.unlocked - stats.inProgress})
                  </button>
                </div>
              </div>
              
              {/* Achievement Categories */}
              {filteredAchievements.length === 0 ? (
                <div className="bg-[#111111] rounded-xl p-8 border border-neutral-800 text-center">
                  <p className="text-neutral-400">No achievements found matching your filters</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
                    <div key={category} className="bg-[#111111] rounded-xl border border-neutral-800 overflow-hidden">
                      {/* Category Header */}
                      <div 
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                        onClick={() => toggleCategory(category)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center mr-3">
                            {category === 'consistency' && '🔄'}
                            {category === 'streaks' && '🔥'}
                            {category === 'reading' && '📚'}
                            {category === 'fitness' && '💪'}
                            {category === 'wellness' && '🧘'}
                            {category === 'social' && '👥'}
                            {category === 'productivity' && '⚡'}
                            {category === 'creativity' && '🎨'}
                            {category === 'finance' && '💰'}
                            {category === 'meta' && '🏆'}
                            {!['consistency', 'streaks', 'reading', 'fitness', 'wellness', 'social', 'productivity', 'creativity', 'finance', 'meta'].includes(category) && '🎯'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{formatCategoryName(category)}</h3>
                            <p className="text-xs text-neutral-400">{categoryAchievements.length} achievements</p>
                          </div>
                        </div>
                        {expandedCategories[category] ? (
                          <FiChevronUp className="text-neutral-400" />
                        ) : (
                          <FiChevronDown className="text-neutral-400" />
                        )}
                      </div>
                      
                      {/* Category Achievements */}
                      <AnimatePresence>
                        {expandedCategories[category] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
                              {categoryAchievements.map(achievement => (
                                <div key={achievement._id} className="h-full">
                                  <AchievementCard 
                                    achievement={achievement} 
                                    isNew={achievement.isNew} 
                                  />
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-[#111111] rounded-xl border border-neutral-800 overflow-hidden">
            <div className="p-4 border-b border-neutral-800">
              <h3 className="font-semibold text-white">Achievement Leaderboard</h3>
              <p className="text-xs text-neutral-400">Top achievers this month</p>
            </div>
            <div className="p-4">
              <AchievementLeaderboard />
            </div>
          </div>
          
          {/* Achievement Progression */}
          {isAuthenticated && !isLoading && !error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl border border-neutral-800 overflow-hidden"
            >
              <div className="p-4 border-b border-neutral-800">
                <h3 className="font-semibold text-white">Your Progress</h3>
                <p className="text-xs text-neutral-400">Achievement journey</p>
              </div>
              <div className="p-4">
                {/* Rarity Progress Bars */}
                <div className="space-y-4">
                  {rarities.filter(r => r !== 'all').map(rarity => {
                    const rarityAchievements = filteredAchievements.filter(a => a.rarity === rarity);
                    const unlockedCount = rarityAchievements.filter(a => a.unlockedAt || a.unlocked).length;
                    const totalCount = rarityAchievements.length;
                    const percentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
                    
                    return (
                      <div key={rarity} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize text-neutral-300">{rarity}</span>
                          <span className="text-neutral-400">{unlockedCount}/{totalCount}</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full ${
                              rarity === 'common' ? 'bg-gradient-to-r from-blue-500 to-green-500' :
                              rarity === 'uncommon' ? 'bg-gradient-to-r from-cyan-500 to-purple-500' :
                              rarity === 'rare' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Next Achievement to Unlock */}
                {achievements.inProgress && achievements.inProgress.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Next Achievement</h4>
                    <div className="bg-[#0a0a0a] rounded-lg p-3 border border-neutral-800">
                      {/* Show the in-progress achievement with highest progress */}
                      {achievements.inProgress
                        .sort((a, b) => {
                          const aProgress = a.progressPercentage || (a.progress && a.criteria?.threshold ? (a.progress / a.criteria.threshold) * 100 : 0);
                          const bProgress = b.progressPercentage || (b.progress && b.criteria?.threshold ? (b.progress / b.criteria.threshold) * 100 : 0);
                          return bProgress - aProgress;
                        })
                        .slice(0, 1)
                        .map(achievement => (
                          <div key={achievement._id} className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-xl mr-3">
                              {achievement.icon || "🏆"}
                            </div>
                            <div>
                              <h5 className="font-medium text-white">{achievement.title}</h5>
                              <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-1">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]" 
                                  style={{ 
                                    width: `${achievement.progressPercentage || (achievement.progress && achievement.criteria?.threshold ? (achievement.progress / achievement.criteria.threshold) * 100 : 0)}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;