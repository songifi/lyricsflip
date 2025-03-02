import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export const SuccessAnimation = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
    >
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Signup Successful!</h2>
      <p>Welcome to LyricFlip!</p>
    </motion.div>
  </motion.div>
)

