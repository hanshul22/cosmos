import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const StyledSection = styled.section`
  .slider-container {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
  }

  .slider {
    display: flex;
    transition: transform 0.5s ease;
  }

  .slide {
    min-width: 100%;
    padding: 2rem;
  }

  .slider-nav {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  .nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(123,137,228,0.3);
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: #7B89E4;
      transform: scale(1.2);
    }
  }

  .news-card {
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: rgba(123,137,228,0.4);
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(123,137,228,0.1);
    }
  }

  .image-container {
    position: relative;
    overflow: hidden;
    
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

  .text-gradient {
    background: linear-gradient(120deg, #7B89E4, #BF8AEB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .news-tag {
    background: rgba(123,137,228,0.1);
    border: 1px solid rgba(123,137,228,0.3);
    color: #7B89E4;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(123,137,228,0.2);
    }
  }

  .read-more {
    color: #7B89E4;
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

  .view-all-btn {
    background: linear-gradient(120deg, #7B89E4, #BF8AEB);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(123,137,228,0.2);
    }
  }
`;

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function SpaceNews() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/blogs');
        setBlogs(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch space blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(sectionRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Start auto-sliding
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 5000);

      return () => {
        tl.kill();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [loading, blogs]);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: `-${currentSlide * 100}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentSlide]);

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

  const featuredBlogs = blogs.slice(0, 3);

  return (
    <StyledSection 
      ref={sectionRef}
      className="py-20 bg-space-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-gradient">Latest Space News</span>
          </h2>
          <p className="text-gray-400">Stay updated with the latest developments in space exploration</p>
        </div>

        <div className="slider-container mb-12">
          <div ref={sliderRef} className="slider">
            {featuredBlogs.map((blog, index) => (
              <div key={blog.id} className="slide">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="image-container">
                    <img 
                      src={blog.image_url} 
                      alt={blog.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="news-tag text-sm px-3 py-1 rounded-full">
                        {blog.news_site}
                      </span>
                      <time className="text-sm text-gray-400">
                        {new Date(blog.published_at).toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {blog.summary}
                    </p>
                    <a 
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more font-medium"
                    >
                      Read Full Article <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-nav">
            {featuredBlogs.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/news"
            className="view-all-btn"
          >
            View All News <ArrowIcon />
          </Link>
        </div>
      </div>
    </StyledSection>
  );
}

export default SpaceNews;