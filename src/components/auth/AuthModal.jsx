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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#111111] rounded-xl w-full max-w-md border border-neutral-800 shadow-xl">
              {/* Header with Tabs */}
              <div className="flex border-b border-neutral-800">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                  }}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300
                    ${
                      isLogin
                        ? "text-white border-b-2 border-[#00F0FF]"
                        : "text-neutral-400 hover:text-white"
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                  }}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300
                    ${
                      !isLogin
                        ? "text-white border-b-2 border-[#00F0FF]"
                        : "text-neutral-400 hover:text-white"
                    }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 m-6 rounded-lg"
                  >
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Section */}
              <div className="p-6">
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
