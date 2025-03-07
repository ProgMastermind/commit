import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Goals",
    value: "24",
    trend: "+12%",
    trendUp: true,
    gradient: "from-cyan-400 to-blue-500",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    title: "Current Streak",
    value: "15",
    trend: "+5",
    trendUp: true,
    gradient: "from-amber-400 to-orange-500",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Achievements",
    value: "156",
    trend: "+8%",
    trendUp: true,
    gradient: "from-fuchsia-500 to-pink-500",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Completion Rate",
    value: "87%",
    trend: "+3%",
    trendUp: true,
    gradient: "from-emerald-400 to-teal-500",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
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
          className="bg-neutral-900/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-800/50
            hover:border-neutral-700/70 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Decorative gradient background that animates on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"
            style={{
              background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              "--tw-gradient-from": stat.gradient
                .split(" ")[0]
                .replace("from-", ""),
              "--tw-gradient-to": stat.gradient
                .split(" ")[1]
                .replace("to-", ""),
            }}
          ></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white`}
              >
                {stat.icon}
              </div>
              <h3 className="text-neutral-300 font-medium">{stat.title}</h3>
            </div>

            <div
              className={`text-sm px-2 py-1 rounded-full flex items-center gap-1
                ${
                  stat.trendUp
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
            >
              {stat.trendUp ? (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              {stat.trend}
            </div>
          </div>

          <div
            className={`text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}
          >
            {stat.value}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default StatsOverview;
