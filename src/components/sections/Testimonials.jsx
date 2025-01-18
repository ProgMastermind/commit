import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mike Kennedy",
      role: "Pro Gamer",
      initials: "MK",
      content:
        "Finally, a platform that understands gamers! The achievement tracking is seamless, and the rewards system keeps me motivated to improve.",
    },
    {
      name: "Sarah Lee",
      role: "Esports Player",
      initials: "SL",
      content:
        "The social features are incredible. Being able to track achievements with my team has taken our coordination to the next level.",
    },
    {
      name: "Raj Kumar",
      role: "Casual Gamer",
      initials: "RJ",
      content:
        "The rewards marketplace makes achievement hunting so much more rewarding. I love being able to earn real rewards for my gaming accomplishments.",
    },
  ];

  const StarRating = () => (
    <div className="flex text-[#FFD700]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Gamers{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
              Say About Us
            </span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            Join thousands of satisfied gamers tracking their achievements
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-[#111111] rounded-xl p-8 border border-neutral-800 hover:border-[#00F0FF] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-semibold">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#B4B4B4] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#E5E4E2] mb-6">{testimonial.content}</p>
              <StarRating />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
