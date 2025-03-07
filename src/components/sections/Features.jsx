import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Smart Goal Setting",
      description:
        "Set SMART goals, break them into achievable milestones, and track your journey to success.",
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
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      bullets: [
        "Daily Progress Tracking",
        "Milestone Management",
        "Visual Goal Maps",
      ],
    },
    {
      title: "Habit Streaks",
      description:
        "Build lasting habits through consistent actions and maintain streaks for better accountability.",
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
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      bullets: ["Streak Analytics", "Habit Formation", "Progress Insights"],
    },
    {
      title: "Accountability Circles",
      description:
        "Connect with like-minded individuals, form accountability groups, and grow together.",
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
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bullets: ["Goal Partners", "Group Challenges", "Community Support"],
    },
  ];

  return (
    <section id="features" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Empower Your{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Personal Growth
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Transform your goals into achievements with powerful tracking tools
            and community support
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-[#111111] p-6 rounded-xl border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="h-12 w-12 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-lg mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#B4B4B4] mb-4">{feature.description}</p>
              <ul className="space-y-2 text-[#E5E4E2]">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-[#00F0FF] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
