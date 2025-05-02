import { motion } from 'framer-motion';
import SolarSystemViewer from '../components/SolarSystemViewer';

function SolarSystem() {
  return (
    <div className="pt-16 min-h-screen bg-space-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
            Explore Our Solar System
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take an interactive journey through our cosmic neighborhood. Click on any planet to learn more about its unique characteristics and place in our solar system.
          </p>
        </motion.div>
      </div>
      
      <SolarSystemViewer />
    </div>
  );
}

export default SolarSystem;