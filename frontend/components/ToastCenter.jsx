import { motion, AnimatePresence } from "framer-motion";

export default function ToastCenter({ mensaje }) {
  return (
    <AnimatePresence>
      {mensaje && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[9999]"
        >
          <div className="bg-[#111] text-[#d4af37] border border-[#d4af37]/60 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center text-lg font-medium">
            {mensaje}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
