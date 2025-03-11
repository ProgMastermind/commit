import React from "react";
import PropTypes from "prop-types";
import AchievementCard from "./AchievementCard";

const GroupAchievements = ({ achievements, sortBy }) => {
  // Handle empty achievements array
  const safeAchievements = Array.isArray(achievements) ? achievements : [];
  
  // Sort achievements based on sortBy value
  const sortedAchievements = [...safeAchievements].sort((a, b) => {
    if (sortBy === "recent") {
      // Handle missing date fields
      const dateA = a.completedAt || a.updatedAt || a.unlockedAt || new Date(0).toISOString();
      const dateB = b.completedAt || b.updatedAt || b.unlockedAt || new Date(0).toISOString();
      return new Date(dateB) - new Date(dateA);
    }
    if (sortBy === "oldest") {
      // Handle missing date fields
      const dateA = a.completedAt || a.updatedAt || a.unlockedAt || new Date(0).toISOString();
      const dateB = b.completedAt || b.updatedAt || b.unlockedAt || new Date(0).toISOString();
      return new Date(dateA) - new Date(dateB);
    }
    if (sortBy === "game") {
      // Handle missing game name field
      const gameA = a.gameName || a.category || "";
      const gameB = b.gameName || b.category || "";
      return gameA.localeCompare(gameB);
    }
    return 0;
  });

  // Calculate unique groups
  const uniqueGroups = new Set(
    sortedAchievements
      .map((a) => a.groupId || a.group?._id || "")
      .filter(Boolean)
  );

  // Calculate total points
  const totalPoints = sortedAchievements.reduce(
    (sum, a) => sum + (a.points || a.xpReward || 0), 
    0
  );

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Group Achievements</p>
          <p className="text-3xl font-bold text-[#00F0FF]">
            {sortedAchievements.length}
          </p>
        </div>
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Active Groups</p>
          <p className="text-3xl font-bold text-[#FF006F]">
            {uniqueGroups.size}
          </p>
        </div>
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Total Points</p>
          <p className="text-3xl font-bold text-[#FFD700]">
            {totalPoints}
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAchievements.map((achievement) => (
          <AchievementCard 
            key={achievement._id || `achievement-${Math.random()}`} 
            achievement={achievement} 
          />
        ))}
        {sortedAchievements.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-400">No group achievements yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

GroupAchievements.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      category: PropTypes.string,
      rarity: PropTypes.string,
      xpReward: PropTypes.number,
      progress: PropTypes.number,
      unlockedAt: PropTypes.string,
      // Legacy fields
      goalName: PropTypes.string,
      gameName: PropTypes.string,
      completedAt: PropTypes.string,
      updatedAt: PropTypes.string,
      points: PropTypes.number,
      groupId: PropTypes.string,
      groupName: PropTypes.string,
    })
  ),
  sortBy: PropTypes.oneOf(["recent", "oldest", "game"]).isRequired,
};

GroupAchievements.defaultProps = {
  achievements: []
};

export default GroupAchievements;
