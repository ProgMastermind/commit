import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Login = ({ setError, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      onSuccess();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focused: { boxShadow: "0 0 0 2px rgba(0, 240, 255, 0.5)" },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            Email Address
          </label>
          <motion.div whileFocus="focused" className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <motion.input
              variants={inputVariants}
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </motion.div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-300"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-[#00F0FF] hover:text-[#FF006F] transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <motion.div whileFocus="focused" className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <motion.input
              variants={inputVariants}
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </motion.div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 border border-neutral-700 rounded bg-neutral-800 focus:ring-[#00F0FF] text-[#00F0FF]"
        />
        <label
          htmlFor="remember_me"
          className="ml-2 block text-sm text-neutral-400"
        >
          Remember me
        </label>
      </div>

      <div className="pt-3">
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
            rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Sign In"
          )}
        </motion.button>
      </div>

      {/* Social Login Options */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-neutral-900 text-neutral-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 focus:ring-2 focus:ring-offset-2
              focus:ring-neutral-500 text-neutral-200 w-full flex justify-center items-center rounded-xl
              border border-neutral-700 transition-all duration-200"
          >
            <svg
              className="h-5 w-5 mr-2"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span>Twitter</span>
          </button>

          <button
            type="button"
            className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 focus:ring-2 focus:ring-offset-2
              focus:ring-neutral-500 text-neutral-200 w-full flex justify-center items-center rounded-xl
              border border-neutral-700 transition-all duration-200"
          >
            <svg
              className="h-5 w-5 mr-2"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </form>
  );
};

Login.propTypes = {
  setError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Login;
