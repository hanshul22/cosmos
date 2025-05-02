import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const StyledSection = styled.section`
  .astronaut-image {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(123,137,228,0.2), rgba(191,138,235,0.2));
      mix-blend-mode: color;
      pointer-events: none;
      border-radius: 1rem;
    }
  }

  .image-glow {
    filter: drop-shadow(0 0 20px rgba(123,137,228,0.3));
  }

  .text-gradient {
    background: linear-gradient(120deg, #7B89E4, #BF8AEB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .highlight-box {
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(123,137,228,0.4);
      transform: translateY(-2px);
    }
  }
`;

function AstronautSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    // Animate the astronaut image
    tl.fromTo(imageRef.current,
      { 
        x: 100,
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)'
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Animate the content
    tl.fromTo(contentRef.current,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Animate stats boxes with stagger
    tl.fromTo(statsRef.current.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <StyledSection 
      ref={sectionRef}
      className="py-20 min-h-screen bg-space-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              <span className="text-gradient">Meet Our Astronauts</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Embark on missions with our elite team of space explorers. 
              Each astronaut brings unique expertise and unwavering dedication 
              to pushing the boundaries of human space exploration.
            </p>
            
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              <div className="highlight-box p-6 rounded-lg">
                <h3 className="font-orbitron text-2xl font-bold text-space-accent mb-2">250+</h3>
                <p className="text-gray-400">Days in Space</p>
              </div>
              <div className="highlight-box p-6 rounded-lg">
                <h3 className="font-orbitron text-2xl font-bold text-space-accent mb-2">15+</h3>
                <p className="text-gray-400">Space Walks</p>
              </div>
              <div className="highlight-box p-6 rounded-lg">
                <h3 className="font-orbitron text-2xl font-bold text-space-accent mb-2">72/73</h3>
                <p className="text-gray-400">Expedition</p>
              </div>
              <div className="highlight-box p-6 rounded-lg">
                <h3 className="font-orbitron text-2xl font-bold text-space-accent mb-2">2024</h3>
                <p className="text-gray-400">Mission Year</p>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="order-1 lg:order-2 astronaut-image">
            <img 
              src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200&auto=format&fit=crop"
              alt="Astronaut in Space"
              className="w-full h-full object-cover image-glow rounded-lg"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
        </div>
      </div>
    </StyledSection>
  );
}

export default AstronautSection;