import { motion } from "framer-motion";

const RewardsProgram = () => {
  const rewardCategories = [
    {
      title: "Wellness Rewards",
      description: "Gym memberships, wellness apps, and health products",
      minPoints: "500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Learning Credits",
      description: "Online courses, books, and educational resources",
      minPoints: "1000",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Productivity Tools",
      description: "Premium apps and productivity subscriptions",
      minPoints: "750",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Experience Rewards",
      description: "Exclusive events and memorable experiences",
      minPoints: "1500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="rewards-program" className="py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Achievement{" "}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Rewards Program
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Turn your consistent efforts into meaningful rewards that support
            your growth journey
          </p>
        </motion.div>

        {/* Points Balance */}
        <motion.div
          className="mb-12 bg-[#111111] rounded-xl p-8 border border-neutral-800 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#E5E4E2] text-xl mb-2">Available Points</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
                2,500
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-[#E5E4E2] text-xl mb-2">
                Achievement Streak
              </h3>
              <div className="text-4xl font-bold text-[#00F0FF]">15 Days</div>
            </div>
          </div>
        </motion.div>

        {/* Reward Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rewardCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-[#111111] rounded-xl p-6 border border-neutral-800 hover:border-[#FFD700] transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-12 w-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center mb-6">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {category.title}
              </h3>
              <p className="text-[#B4B4B4] mb-4">{category.description}</p>
              <div className="text-[#FFD700] font-bold">
                From {category.minPoints} points
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full text-white font-semibold"
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Earning Rewards
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RewardsProgram;
