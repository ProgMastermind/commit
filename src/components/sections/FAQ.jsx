import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the achievement tracking work?",
      answer:
        "Our platform automatically syncs with your gaming accounts to track achievements across multiple platforms, visualizing your progress through our intuitive dashboard.",
    },
    {
      question: "What games are supported?",
      answer:
        "We support major titles including Free Fire, PUBG, League of Legends, and many more. Our list of supported games is continuously expanding.",
    },
    {
      question: "How do Private Circles work?",
      answer:
        "Private Circles allow you to create groups of up to 10 members where you can set collaborative goals, track shared progress, and visualize group achievements together.",
    },
    {
      question: "How does the rewards system work?",
      answer:
        "Complete achievements to earn coins, which can be redeemed for various rewards including movies, groceries, food, and more. Maintain achievement streaks to earn bonus rewards.",
    },
    {
      question:
        "Can I track achievements across multiple games simultaneously?",
      answer:
        "Yes! Our platform allows you to track achievements across multiple games simultaneously, providing a comprehensive view of your gaming progress in one place.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400">
            Everything you need to know about Commit
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
