import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50+", label: "Supported Games" },
    { value: "1M+", label: "Achievements Tracked" },
  ];

  return (
    <section id="cta" className="bg-neutral-900 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10" />

      <div className="max-w-6xl mx-auto px-4 py-20 relative">
        <motion.div
          className="bg-neutral-800 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_0_rgba(0,240,255,0.1)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Main CTA Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Track Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#FF006F]">
                  Gaming Journey
                </span>
                ?
              </h2>
              <p className="text-neutral-400 text-lg mb-6">
                Join thousands of gamers who are already tracking their
                achievements and earning rewards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white font-bold text-lg hover:shadow-[0_0_20px_0_rgba(0,240,255,0.5)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
              >
                Get Started Now
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-lg border-2 border-[#00F0FF] text-[#00F0FF] font-bold text-lg hover:bg-[#00F0FF]/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Demo
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-[#FFD700] text-4xl font-bold mb-2">
                  {stat.value}
                </h3>
                <p className="text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
