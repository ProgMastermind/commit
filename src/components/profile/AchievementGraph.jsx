import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const AchievementGraph = ({ contributions }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Helper function to get the color based on contribution count
  const getColorIntensity = (count) => {
    if (count === 0) return "bg-neutral-800";
    if (count === 1)
      return "bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20";
    if (count === 2)
      return "bg-gradient-to-r from-[#00F0FF]/40 to-[#FF006F]/40";
    if (count === 3)
      return "bg-gradient-to-r from-[#00F0FF]/60 to-[#FF006F]/60";
    return "bg-gradient-to-r from-[#00F0FF] to-[#FF006F]";
  };

  // Helper function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Group contributions by week
  const weeks = [];
  let currentWeek = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl border border-neutral-800 p-6"
    >
      <h3 className="text-xl font-bold text-white mb-6">
        Achievement Activity
      </h3>

      {/* Graph Container */}
      <div className="relative">
        {/* Tooltip */}
        {hoveredDay && (
          <div
            className="absolute bg-neutral-900 border border-neutral-800 rounded-lg p-3 z-10
              text-sm shadow-xl pointer-events-none"
            style={{
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <p className="text-white font-medium">
              {hoveredDay.count} achievements
            </p>
            <p className="text-neutral-400">{formatDate(hoveredDay.date)}</p>
          </div>
        )}

        {/* Graph */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-2">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-4 h-4 rounded-sm cursor-pointer ${getColorIntensity(
                    day.count,
                  )} transition-all duration-300`}
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setHoveredDay(day)}
                  onHoverEnd={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-4 gap-2 text-sm">
          <span className="text-neutral-400">Less</span>
          {[0, 1, 2, 3, 4].map((count) => (
            <div
              key={count}
              className={`w-3 h-3 rounded-sm ${getColorIntensity(count)}`}
            />
          ))}
          <span className="text-neutral-400">More</span>
        </div>
      </div>
    </motion.div>
  );
};

AchievementGraph.propTypes = {
  contributions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default AchievementGraph;
