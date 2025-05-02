import { motion } from 'framer-motion';

function Contact() {
  return (
    <div className="pt-20 min-h-screen bg-space-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-orbitron font-bold text-white mb-8"
        >
          Join the Mission
        </motion.h1>
        <div className="space-y-8">
          {/* Contact form will be added here */}
          <p className="text-gray-300">Contact form coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;