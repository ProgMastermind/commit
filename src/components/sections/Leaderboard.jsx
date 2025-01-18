import { motion } from "framer-motion";

const Leaderboard = () => {
  const topPlayers = [
    {
      rank: 1,
      name: "AlphaKing",
      initials: "AK",
      achievements: 458,
      points: "98,450",
    },
    {
      rank: 2,
      name: "NinjaSniper",
      initials: "NS",
      achievements: 445,
      points: "96,320",
    },
    {
      rank: 3,
      name: "ProWarrior",
      initials: "PW",
      achievements: 442,
      points: "95,780",
    },
  ];

  const performanceStats = [
    { label: "Your Rank", value: "#254", color: "text-white" },
    { label: "Weekly Progress", value: "+15", color: "text-[#00F0FF]" },
    { label: "Achievement Rate", value: "92%", color: "text-[#FFD700]" },
  ];

  return (
    <section id="leaderboard" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Global{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Leaderboards
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Compete with players worldwide and climb the ranks
          </p>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          className="bg-[#111111] rounded-xl border border-neutral-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-6 border-b border-neutral-800">
            <h3 className="text-xl font-bold text-white">
              Top Players This Week
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#E5E4E2]">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#E5E4E2]">
                    Player
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#E5E4E2]">
                    Achievements
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#E5E4E2]">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {topPlayers.map((player, index) => (
                  <tr
                    key={index}
                    className="hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`font-bold ${
                          index === 0
                            ? "text-[#FFD700]"
                            : index === 1
                              ? "text-[#E5E4E2]"
                              : "text-[#B4B4B4]"
                        }`}
                      >
                        #{player.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-white font-bold">
                          {player.initials}
                        </div>
                        <span className="ml-4 text-white">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#E5E4E2]">
                      {player.achievements}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#00F0FF] font-bold">
                        {player.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {performanceStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#111111] rounded-xl p-6 border border-neutral-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-[#B4B4B4] mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
