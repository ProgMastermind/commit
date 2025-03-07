import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How does CommiT's goal tracking system work?",
      answer:
        "CommiT uses a simple yet powerful goal tracking system where you can set SMART goals, break them into milestones, and track daily progress. Our platform automatically syncs across devices and sends gentle reminders to keep you accountable.",
    },
    {
      question: "What are Accountability Circles?",
      answer:
        "Accountability Circles are small groups of 5-10 members who share similar goals. You can set collaborative challenges, track shared progress, and support each other through daily check-ins and encouragement.",
    },
    {
      question: "How does the rewards system work?",
      answer:
        "Complete your goals consistently to earn points. These points can be redeemed for various rewards including wellness products, learning resources, and exclusive experiences. Maintain streaks to earn bonus rewards.",
    },
    {
      question: "Can I track multiple goals simultaneously?",
      answer:
        "Yes! You can track multiple goals across different areas of your life - fitness, learning, personal development, and more. Our dashboard provides a comprehensive view of all your goals and progress.",
    },
    {
      question: "How do you help maintain long-term motivation?",
      answer:
        "We combine proven psychology with gamification elements. Through streaks, milestone celebrations, community support, and tangible rewards, we help make goal achievement an engaging and sustainable journey.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Common Questions About{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              CommiT
            </span>
          </h2>
          <p className="text-neutral-400">
            Everything you need to know about achieving your goals with CommiT
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="grid gap-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full flex justify-between items-center text-white"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-semibold text-left">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-6 h-6 text-[#00F0FF] flex-shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={false}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-neutral-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
