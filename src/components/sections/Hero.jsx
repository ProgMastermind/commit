import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="min-h-[70vh] bg-[#090909] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between h-full gap-12">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Level Up Your{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Gaming Journey
            </span>{" "}
            with Achievement Tracking
          </h1>
          <p className="text-[#B4B4B4] text-lg md:text-xl mb-8 max-w-2xl">
            Track your gaming achievements across multiple platforms, set goals,
            and earn rewards. Join a community of gamers who are committed to
            excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now
            </motion.button>
            <motion.a
              href="#features"
              className="px-8 py-3 border border-[#00F0FF] rounded-full text-white font-semibold hover:bg-[#00F0FF]/10 transition-all duration-300"
              whileHover={{ backgroundColor: "rgba(0, 240, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              See More
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content - Achievement Graph */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contribution-graph bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
            <div className="grid grid-cols-7 gap-2">
              {[...Array(49)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-6 h-6 rounded-sm achievement-square level-${Math.floor(Math.random() * 5)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    background: `linear-gradient(45deg, rgba(0, 240, 255, ${Math.random() * 0.8}), rgba(255, 0, 111, ${Math.random() * 0.8}))`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Add these styles to your index.css or a separate styles file
const styles = `
  .achievement-square {
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .achievement-square.level-0 { background-color: #1e1e1e; }
  .achievement-square.level-1 { background: linear-gradient(45deg, #00F0FF20, #FF006F20); }
  .achievement-square.level-2 { background: linear-gradient(45deg, #00F0FF40, #FF006F40); }
  .achievement-square.level-3 { background: linear-gradient(45deg, #00F0FF60, #FF006F60); }
  .achievement-square.level-4 { background: linear-gradient(45deg, #00F0FF, #FF006F); }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Add this to your document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Hero;
