import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="p-6 border-b border-neutral-700/50">
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-neutral-300">{message}</p>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-700/50 flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700
                    text-white transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onConfirm}
                  className={`px-6 py-2.5 rounded-xl ${confirmColor} hover:opacity-90
                    text-white font-medium transition-all`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  confirmColor: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  confirmColor: "bg-red-500",
};

export default ConfirmationModal;
