import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AuthModal from "../auth/AuthModal";

const Hero = () => {
  const [activeSquares, setActiveSquares] = useState(new Array(49).fill(false));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const animateSquares = () => {
      setActiveSquares(new Array(49).fill(false));
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < 49) {
          setActiveSquares((prev) => {
            const newSquares = [...prev];
            newSquares[currentIndex] = true;
            return newSquares;
          });
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    };

    animateSquares();
  }, []);

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
            Transform Your{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Goals into Reality
            </span>{" "}
            with Accountability
          </h1>
          <p className="text-[#B4B4B4] text-lg md:text-xl mb-8 max-w-2xl">
            Turn your aspirations into achievements through gamified
            goal-tracking, community support, and rewarding consistency. Join a
            community of committed individuals who make every day count.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Start Your Journey
            </motion.button>
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
            <motion.a
              href="#features"
              className="px-8 py-3 border border-[#00F0FF] rounded-full text-white font-semibold hover:bg-[#00F0FF]/10 transition-all duration-300"
              whileHover={{ backgroundColor: "rgba(0, 240, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content - Goal Progress Visualization */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="progress-visualization bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
            <div className="grid grid-cols-7 gap-2">
              {[...Array(49)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-6 h-6 rounded-sm goal-square`}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: activeSquares[index] ? 1 : 0.3,
                    background: activeSquares[index]
                      ? `linear-gradient(45deg, rgba(0, 240, 255, ${Math.random() * 0.8}), rgba(255, 0, 111, ${Math.random() * 0.8}))`
                      : `linear-gradient(45deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 111, 0.1))`,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
