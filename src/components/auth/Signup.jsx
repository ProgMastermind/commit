import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Signup = ({ setError, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
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

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, color: "bg-neutral-700", text: "" };

    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const strength = [
      length >= 8,
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
    ].filter(Boolean).length;

    if (strength <= 1) return { level: 20, color: "bg-red-500", text: "Weak" };
    if (strength === 2)
      return { level: 40, color: "bg-orange-500", text: "Fair" };
    if (strength === 3)
      return { level: 60, color: "bg-yellow-500", text: "Good" };
    if (strength === 4)
      return { level: 80, color: "bg-blue-500", text: "Strong" };
    return { level: 100, color: "bg-green-500", text: "Very Strong" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            Username
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <motion.input
              variants={inputVariants}
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50
                text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                transition-all duration-300"
              placeholder="Choose a username"
              required
            />
          </motion.div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            Password
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
              placeholder="Create a password"
              required
            />
          </motion.div>

          {/* Password strength indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength.level}%` }}
                  className={`h-full ${passwordStrength.color}`}
                />
              </div>
              <p className="text-xs mt-1 text-neutral-400">
                Password strength:{" "}
                <span
                  className={`font-medium ${passwordStrength.color.replace("bg-", "text-")}`}
                >
                  {passwordStrength.text}
                </span>
              </p>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            Confirm Password
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <motion.input
              variants={inputVariants}
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/50 border
                              text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#00F0FF]/50 focus:border-[#00F0FF]
                              transition-all duration-300 ${
                                formData.password &&
                                formData.confirmPassword &&
                                formData.password !== formData.confirmPassword
                                  ? "border-red-500"
                                  : "border-neutral-700/50"
                              }`}
              placeholder="Confirm your password"
              required
            />
          </motion.div>
          {formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="h-4 w-4 border border-neutral-700 rounded bg-neutral-800 focus:ring-[#00F0FF] text-[#00F0FF]"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-neutral-400">
            I agree to the{" "}
            <a
              href="#"
              className="text-[#00F0FF] hover:text-[#FF006F] transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#00F0FF] hover:text-[#FF006F] transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>
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
            "Create Account"
          )}
        </motion.button>
      </div>
    </form>
  );
};

Signup.propTypes = {
  setError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Signup;
