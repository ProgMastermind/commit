import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Goals",
    value: "24",
    trend: "+12%",
    trendUp: true,
    gradient: "from-[#00F0FF] to-[#FF006F]",
  },
  {
    title: "Achievements",
    value: "156",
    trend: "+8%",
    trendUp: true,
    gradient: "from-[#FFD700] to-[#FFA500]",
  },
  {
    title: "Current Streak",
    value: "15",
    trend: "+5",
    trendUp: true,
    gradient: "from-[#00F0FF] to-[#FF006F]",
  },
  {
    title: "Completion Rate",
    value: "87%",
    trend: "+3%",
    trendUp: true,
    gradient: "from-[#FFD700] to-[#FFA500]",
  },
];

const StatsOverview = () => {
  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-neutral-400 font-medium">{stat.title}</h3>
            <div
              className={`text-sm px-2 py-1 rounded-full ${
                stat.trendUp
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {stat.trend}
            </div>
          </div>
          <div
            className={`text-3xl font-bold mt-4 bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`}
          >
            {stat.value}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default StatsOverview;
