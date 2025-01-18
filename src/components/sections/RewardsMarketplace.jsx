import { motion } from "framer-motion";

const RewardsMarketplace = () => {
  const rewardCategories = [
    {
      title: "Movies",
      description: "Cinema tickets and streaming subscriptions",
      minCoins: "500",
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
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      title: "Groceries",
      description: "Store vouchers and discount codes",
      minCoins: "1000",
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Food",
      description: "Restaurant and delivery vouchers",
      minCoins: "750",
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Other Rewards",
      description: "Gaming accessories and merchandise",
      minCoins: "1500",
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
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="rewards-marketplace" className="py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Rewards{" "}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Marketplace
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Convert your achievements into real rewards across multiple
            categories
          </p>
        </motion.div>

        {/* Rewards Balance */}
        <motion.div
          className="mb-12 bg-[#111111] rounded-xl p-8 border border-neutral-800 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#E5E4E2] text-xl mb-2">Available Coins</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
                2,500
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-[#E5E4E2] text-xl mb-2">Current Streak</h3>
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
                From {category.minCoins} coins
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

export default RewardsMarketplace;
