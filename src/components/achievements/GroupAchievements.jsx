import PropTypes from "prop-types";
import AchievementCard from "./AchievementCard";

const GroupAchievements = ({ achievements, sortBy }) => {
  // Sort achievements based on sortBy value
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (sortBy === "recent") {
      return (
        new Date(b.completedAt || b.updatedAt) -
        new Date(a.completedAt || a.updatedAt)
      );
    }
    if (sortBy === "oldest") {
      return (
        new Date(a.completedAt || a.updatedAt) -
        new Date(b.completedAt || b.updatedAt)
      );
    }
    if (sortBy === "game") {
      return a.gameName.localeCompare(b.gameName);
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Group Achievements</p>
          <p className="text-3xl font-bold text-[#00F0FF]">
            {achievements.length}
          </p>
        </div>
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Active Groups</p>
          <p className="text-3xl font-bold text-[#FF006F]">
            {new Set(achievements.map((a) => a.groupId)).size}
          </p>
        </div>
        <div className="bg-[#111111] rounded-xl p-6 border border-neutral-800">
          <p className="text-neutral-400">Total Points</p>
          <p className="text-3xl font-bold text-[#FFD700]">
            {achievements.reduce((sum, a) => sum + (a.points || 0), 0)}
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAchievements.map((achievement) => (
          <AchievementCard key={achievement._id} achievement={achievement} />
        ))}
        {achievements.length === 0 && (
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
      _id: PropTypes.string.isRequired,
      goalName: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      completedAt: PropTypes.string,
      updatedAt: PropTypes.string,
      points: PropTypes.number,
      groupId: PropTypes.string.isRequired,
      groupName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sortBy: PropTypes.oneOf(["recent", "oldest", "game"]).isRequired,
};

export default GroupAchievements;
