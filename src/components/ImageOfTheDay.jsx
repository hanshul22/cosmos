import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const StyledSection = styled.section`
  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(123,137,228,0.15);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
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

  .content-box {
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(123,137,228,0.4);
      box-shadow: 0 4px 20px rgba(123,137,228,0.1);
    }
  }

  .read-more-btn {
    color: #7B89E4;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #BF8AEB;
      gap: 0.75rem;
    }

    svg {
      transition: transform 0.3s ease;
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }

  .explanation {
    transition: all 0.3s ease;
  }
`;

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function ImageOfTheDay() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=AvC24DXNHHfxIekGYQmk6pU1sq17hk6otn89oFu9');
        setApodData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch image of the day');
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  useEffect(() => {
    if (!loading && apodData) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: "power3.out"
        }
      );

      tl.fromTo(contentRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.8"
      );

      return () => {
        tl.kill();
      };
    }
  }, [loading, apodData]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
    
    gsap.to(textRef.current, {
      height: isExpanded ? "100px" : "auto",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-dark">
        <div className="loading-animation"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-dark">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const wordCount = apodData.explanation.split(' ').length;
  const shouldTruncate = wordCount > 50;
  const truncatedText = shouldTruncate && !isExpanded 
    ? apodData.explanation.split(' ').slice(0, 50).join(' ') + '...'
    : apodData.explanation;

  return (
    <StyledSection 
      ref={sectionRef}
      className="py-20 min-h-screen bg-space-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold">
            <span className="text-gradient">Image Of The Day</span>
          </h2>
          <p className="text-gray-400 mt-4">Discover the cosmos through NASA's lens</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={imageRef} className="image-container">
            <img 
              src={apodData.url} 
              alt={apodData.title}
              className="w-full image-glow"
            />
          </div>
          
          <div ref={contentRef} className="content-box p-8 rounded-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-orbitron font-bold text-space-accent mb-2">
                {apodData.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {new Date(apodData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {apodData.copyright && (
                <p className="text-gray-400 text-sm mt-1">
                  © {apodData.copyright}
                </p>
              )}
            </div>
            
            <div 
              ref={textRef} 
              className="explanation"
              style={{ height: shouldTruncate && !isExpanded ? "100px" : "auto", overflow: "hidden" }}
            >
              <p className="text-gray-300 leading-relaxed">
                {truncatedText}
              </p>
            </div>

            {shouldTruncate && (
              <button 
                onClick={toggleReadMore}
                className="read-more-btn mt-4"
              >
                {isExpanded ? 'Read Less' : 'Read More'} <ArrowIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </StyledSection>
  );
}

export default ImageOfTheDay;