import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
              {/* Header with Tabs */}
              <div className="relative">
                {/* Glowing accent decoration */}
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/30 to-[#FF006F]/30 rounded-full blur-3xl" />

                <div className="relative flex border-b border-neutral-700/50 p-1 z-10">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError("");
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium rounded-t-lg transition-all duration-300
                      ${
                        isLogin
                          ? "text-white bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10"
                          : "text-neutral-400 hover:text-white"
                      }`}
                  >
                    <span className={isLogin ? "relative" : ""}>
                      Login
                      {isLogin && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                        />
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError("");
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium rounded-t-lg transition-all duration-300
                      ${
                        !isLogin
                          ? "text-white bg-gradient-to-r from-[#00F0FF]/10 to-[#FF006F]/10"
                          : "text-neutral-400 hover:text-white"
                      }`}
                  >
                    <span className={!isLogin ? "relative" : ""}>
                      Sign Up
                      {!isLogin && (
                        <motion.span
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]"
                        />
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Logo and Title */}
              <div className="text-center pt-8 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative inline-block"
                >
                  <div className="absolute inset-0 blur-md bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full opacity-50" />
                  <div className="relative flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-[#00F0FF] to-[#FF006F] rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-white"
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
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-2xl font-bold text-white"
                >
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                    CommiT
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-1 text-neutral-400"
                >
                  {isLogin
                    ? "Sign in to continue your journey"
                    : "Create an account to get started"}
                </motion.p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Section */}
              <div className="p-8">
                {isLogin ? (
                  <Login
                    setError={setError}
                    onSuccess={() => {
                      onClose();
                      navigate("/dashboard");
                    }}
                  />
                ) : (
                  <Signup
                    setError={setError}
                    onSuccess={() => {
                      setIsLogin(true);
                      setError("Account created! Please login.");
                    }}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 text-center">
                <p className="text-neutral-500 text-sm">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                    }}
                    className="text-[#00F0FF] hover:text-[#FF006F] transition-colors duration-300 font-medium"
                  >
                    {isLogin ? "Sign up" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuthModal;
