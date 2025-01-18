import { motion } from "framer-motion";

const SocialCommunity = () => {
  const communityStats = [
    { value: "50K+", label: "Active Members" },
    { value: "1000+", label: "Private Circles" },
    { value: "100+", label: "Daily Challenges" },
  ];

  return (
    <section id="social-community" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect with{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Gaming Communities
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Join private circles or public communities to share achievements and
            compete together
          </p>
        </motion.div>

        {/* Community Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Private Circles */}
          <motion.div
            className="bg-[#111111] rounded-xl p-8 border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-xl flex items-center justify-center">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">
                Private Circles
              </h3>
            </div>
            <div className="space-y-4">
              {[
                "Up to 10 members per circle",
                "Collaborative goal setting",
                "Private achievement tracking",
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-[#E5E4E2]">
                  <svg
                    className="w-5 h-5 text-[#00F0FF] mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Public Communities */}
          <motion.div
            className="bg-[#111111] rounded-xl p-8 border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-xl flex items-center justify-center">
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">
                Public Communities
              </h3>
            </div>
            <div className="space-y-4">
              {[
                "Open challenges and events",
                "Global leaderboards",
                "Community discussion forums",
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-[#E5E4E2]">
                  <svg
                    className="w-5 h-5 text-[#00F0FF] mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#111111] rounded-xl p-6 text-center border border-neutral-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-[#B4B4B4]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialCommunity;
