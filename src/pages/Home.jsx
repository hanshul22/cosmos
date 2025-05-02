import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import { Howl } from 'howler';
import SpaceBackground from '../components/SpaceBackground';
import AnimatedHeroSection from '../components/AnimatedHeroSection';
import FeaturedNews from '../components/FeaturedNews';
import AstronautSection from '../components/AstronautSection';
import ImageOfTheDay from '../components/ImageOfTheDay';
import SpaceNews from '../components/SpaceNews';

const spaceSound = new Howl({
  src: ['https://assets.codepen.io/154874/space-ambient.mp3'],
  volume: 0.1,
  loop: true
});

function Home() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        spaceSound.play();
      }
    };

    window.addEventListener('click', handleInteraction);
    setTimeout(() => setIsLoading(false), 2000);

    return () => window.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-dark">
        <div className="loading-animation"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <SpaceBackground />
      
      <Particles
        id="space-particles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: ["#ffffff", "#FFD93D", "#7B89E4", "#FF6B6B"],
            },
            size: {
              value: { min: 0.5, max: 2 },
              random: true,
            },
            move: {
              enable: true,
              speed: { min: 0.1, max: 0.5 },
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 150,
                links: {
                  opacity: 0.2,
                },
              },
            },
          },
        }}
        className="absolute inset-0"
      />

      <div className="min-h-screen flex items-center">
        <motion.div 
          className="relative flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="space-gradient absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <AnimatedHeroSection />
        </motion.div>
      </div>

      <ImageOfTheDay />

      <AstronautSection />

      <SpaceNews />

      <FeaturedNews />

      <section id="mission" className="relative min-h-screen bg-space-dark/90 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-space-accent">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We are dedicated to pushing the boundaries of human exploration, 
              advancing scientific discovery, and inspiring the next generation 
              of space pioneers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Exploration",
                description: "Venture beyond Earth's boundaries to explore new worlds and expand human presence in space.",
                icon: "🚀"
              },
              {
                title: "Innovation",
                description: "Develop cutting-edge technologies that will enable humanity's journey to the stars.",
                icon: "⚡"
              },
              {
                title: "Discovery",
                description: "Uncover the mysteries of the cosmos and advance our understanding of the universe.",
                icon: "🔭"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-space-dark/50 backdrop-blur-lg p-8 rounded-lg border border-space-accent/20 hover:border-space-accent/50 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-orbitron text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;