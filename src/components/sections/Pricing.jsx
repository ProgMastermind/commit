import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["Basic Achievement Tracking", "3 Active Games", "Basic Stats"],
      buttonText: "Get Started",
      gradient: "from-[#00F0FF] to-[#FF006F]",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Monthly",
      features: [
        "Advanced Achievement Tracking",
        "Unlimited Games",
        "Premium Rewards",
        "Priority Support",
      ],
      buttonText: "Get Pro",
      gradient: "from-[#FFD700] to-[#FFA500]",
      popular: true,
    },
    {
      name: "Elite",
      price: "$19.99",
      description: "Monthly",
      features: [
        "Everything in Pro",
        "Custom Achievement Badges",
        "API Access",
        "24/7 VIP Support",
      ],
      buttonText: "Get Elite",
      gradient: "from-[#00F0FF] to-[#FF006F]",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Gaming Journey
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Select the perfect plan to enhance your achievement tracking
            experience
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-[#111111] rounded-xl p-8 border ${
                plan.popular
                  ? "border-[#FFD700] transform scale-105 shadow-xl"
                  : "border-neutral-800 hover:border-[#00F0FF]"
              } transition-all duration-300 relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                </div>
                <p className="text-[#B4B4B4]">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-[#E5E4E2]">
                    <svg
                      className={`w-5 h-5 mr-3 ${
                        plan.popular ? "text-[#FFD700]" : "text-[#00F0FF]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-3 bg-gradient-to-r ${plan.gradient}
                rounded-full text-white font-semibold hover:opacity-90
                transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
