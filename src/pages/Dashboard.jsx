import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentAchievements from "../components/dashboard/RecentAchievements";
import GoalsProgress from "../components/dashboard/GoalsProgress";
// import ActivityCalendar from "../components/dashboard/ActivityCalendar";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
            Welcome back, Player!
          </h1>
          <p className="text-neutral-400 mt-1">
            Track your progress and achievements
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-[#00F0FF]/20"
        >
          Add New Goal +
        </motion.button>
      </header>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Achievements Section */}
        <div className="lg:col-span-2">
          <RecentAchievements />
        </div>

        {/* Goals Progress Section */}
        <div className="lg:col-span-1">
          <GoalsProgress />
        </div>
      </div>

      {/* Activity Calendar Section */}
      {/* <ActivityCalendar /> */}
    </div>
  );
};

export default Dashboard;
