import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const sidebarItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    path: "/goals",
    name: "Goals",
    icon: (
      <svg
        className="w-6 h-6"
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
  },
  {
    path: "/groups",
    name: "Groups",
    icon: (
      <svg
        className="w-6 h-6"
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
  },
  {
    path: "/achievements",
    name: "Achievements",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    path: "/profile",
    name: "Profile",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const sidebarVariants = {
    open: {
      x: 0,
      width: "280px",
      transition: { duration: 0.3, type: "spring", damping: 25 },
    },
    closed: {
      x: isMobile ? -280 : 0,
      width: isMobile ? 280 : 80,
      transition: { duration: 0.3, type: "spring", damping: 25 },
    },
  };

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-neutral-900 to-neutral-950 border-r border-neutral-800/50 z-30
        ${isMobile ? "shadow-2xl" : ""}`}
    >
      {/* Logo Section with Accent Gradient */}
      <div className="relative h-16 flex items-center justify-between px-6 border-b border-neutral-800/50">
        {/* Decorative gradient orb */}
        <div className="absolute -left-14 -top-14 w-28 h-28 bg-gradient-to-r from-[#00F0FF]/20 to-[#FF006F]/20 rounded-full blur-xl opacity-50" />

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 relative"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                CommiT
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
          >
            <svg
              className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* User Profile Section */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 px-5"
        >
          <div className="bg-neutral-800/30 rounded-xl p-4 border border-neutral-800/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#FF006F] flex items-center justify-center text-white font-semibold">
                  PG
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900"></div>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-medium text-white truncate">
                  ProGamer
                </h3>
                <p className="text-xs text-neutral-400 truncate">Level 24</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Items */}
      <nav className="mt-6 px-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10 border border-[#00F0FF]/20"
                    : "hover:bg-neutral-800/30"
                }
                ${isActive ? "text-white" : "text-neutral-400"}
              `}
            >
              <div
                className={`${
                  isActive
                    ? "text-[#00F0FF]"
                    : "text-neutral-400 group-hover:text-[#00F0FF]"
                }`}
              >
                {item.icon}
              </div>
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-medium whitespace-nowrap"
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00F0FF]/5 to-[#FF006F]/5"
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active indicator dot for collapsed sidebar */}
              {!isOpen && isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section with Stats */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 left-4 right-4"
        >
          <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10 rounded-xl p-4 border border-neutral-800/70">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">Current Streak</h4>
              <span className="text-xs px-2 py-1 bg-neutral-800/70 rounded-full text-[#00F0FF]">
                15 Days
              </span>
            </div>
            <div className="w-full h-2 bg-neutral-800/70 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Keep going! Youre on fire! 🔥
            </p>
          </div>

          <a
            href="#"
            className="mt-4 flex items-center justify-center gap-2 text-neutral-400 hover:text-[#00F0FF] transition-colors text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </a>
        </motion.div>
      )}
    </motion.aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  isOpen: true,
  isMobile: false,
};

export default Sidebar;
