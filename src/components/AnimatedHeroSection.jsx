import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const StyledWrapper = styled.div`
  .Explore-Button {
    width: fit-content;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 15px;
    gap: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: linear-gradient(120deg, rgb(65, 43, 95), rgb(96, 51, 154));
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(123,137,228,0.3);
      
      .telescope {
        transform: rotate(-35deg);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  .IconContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
  }

  .telescope {
    width: 100%;
    height: auto;
    transform-origin: center;
    transition: all 1s;
    transform: rotate(20deg);
  }

  .tripod {
    width: 60%;
    height: auto;
  }

  .text {
    color: rgb(240, 240, 240);
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1px;
    font-family: "Orbitron", sans-serif;
  }
`;

function AnimatedHeroSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const headingText = new SplitType(headingRef.current, { types: 'chars' });
    const bodyText = new SplitType(textRef.current, { types: 'lines' });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
        duration: 1
      }
    });

    gsap.set(headingText.chars, { 
      opacity: 0,
      y: -100
    });
    
    gsap.set(bodyText.lines, { 
      opacity: 0,
      x: -100
    });
    
    gsap.set(buttonRef.current, { 
      opacity: 0,
      scale: 0.5
    });

    tl.fromTo(headingText.chars,
      { opacity: 0, y: -100 },
      { 
        opacity: 1, 
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.2)'
      }
    )
    .fromTo(bodyText.lines,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      },
      '-=0.5'
    )
    .fromTo(buttonRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
      if (headingText.revert) headingText.revert();
      if (bodyText.revert) bodyText.revert();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative z-10 text-left px-8 lg:px-16 max-w-4xl h-screen flex flex-col justify-center"
    >
      <h1 
        ref={headingRef}
        className="font-orbitron text-5xl md:text-7xl font-bold mb-8 text-glow"
      >
        Explore The Cosmos
      </h1>
      <p 
        ref={textRef}
        className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed text-gray-300"
      >
        Embark on an extraordinary journey through space and time. 
        Discover the wonders of our universe and humanity's next giant leap.
      </p>
      <div ref={buttonRef}>
        <StyledWrapper>
          <button className="Explore-Button" onClick={() => document.getElementById('mission').scrollIntoView({ behavior: 'smooth' })}>
            <span className="IconContainer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 156 78" className="telescope">
                <path fill="url(#paint0_linear_131_19)" d="M10.3968 78C10.6002 78 32 72.831 32 72.831C29.5031 68.7434 27.3945 63.5193 26.0258 57.947C24.6386 52.3381 24.0837 46.7841 24.3982 42L3.38683 47.0957C0.0205717 47.9206 -1.0152 55.4725 1.09333 63.9959C3.05409 72.0061 7.10469 78 10.3968 78Z" />
                <path fill="url(#paint1_linear_131_19)" d="M63.0824 25L34.8099 32.0351C33.7675 32.2957 32.8714 33.0215 32.1582 34.1382C31.6096 34.9943 31.1524 36.0738 30.8049 37.3393C30.5489 38.2513 30.366 39.2563 30.238 40.3544C29.6894 44.7839 30.0734 50.5348 31.5547 56.6207C33.0177 62.7067 35.2854 67.9925 37.7725 71.6587C38.3942 72.5707 39.016 73.371 39.6561 74.0596C40.5339 75.0274 41.43 75.7718 42.3078 76.2743C43.1307 76.7396 43.9536 77 44.74 77C45.0326 77 45.3252 76.9628 45.5995 76.8883L72.5919 70.1698L74 69.8164C69.867 64.1027 66.6484 56.1184 64.7282 48.1527C62.7532 39.9451 62.1497 31.8306 63.0094 25.3166C63.0458 25.2233 63.0643 25.1117 63.0824 25Z" />
                <path fill="url(#paint2_linear_131_19)" d="M155.865 50.9153L144.361 3.54791C143.844 1.43031 141.964 0 139.88 0C139.512 0 139.143 0.0371509 138.774 0.130028L75.0921 15.8448C74.3361 16.0306 73.654 16.4021 73.0271 16.9594C72.1239 17.7581 71.3493 18.9284 70.7411 20.3958C70.3537 21.3246 70.0403 22.3648 69.7823 23.4979C68.4731 29.2935 68.7683 37.7267 70.9621 46.7544C73.2115 55.9863 76.9358 63.7509 80.8447 68.2277C81.6375 69.1194 82.4303 69.8995 83.2229 70.5125C83.4259 70.6795 83.6654 70.8283 83.9051 70.9581C85.6752 71.9798 87.7955 72.2584 89.7865 71.7571L152.492 56.5065C154.962 55.912 156.474 53.4044 155.865 50.9153Z" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" y2={78} x2={16} y1={42} x1={16} id="paint0_linear_131_19">
                    <stop stopColor="#6A8EF6" />
                    <stop stopColor="#BF8AEB" offset={1} />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" y2={77} x2={52} y1={25} x1={52} id="paint1_linear_131_19">
                    <stop stopColor="#6A8EF6" />
                    <stop stopColor="#BF8AEB" offset={1} />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" y2={72} x2="112.5" y1={0} x1="112.5" id="paint2_linear_131_19">
                    <stop stopColor="#6A8EF6" />
                    <stop stopColor="#BF8AEB" offset={1} />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 104 69" className="tripod">
                <path strokeLinecap="round" strokeWidth={11} stroke="url(#paint0_linear_124_14)" d="M98.4336 63.3406L52 5.99991" />
                <path strokeLinecap="round" strokeWidth={11} stroke="url(#paint1_linear_124_14)" d="M52.4336 6L6.00004 63.3407" />
                <path strokeLinecap="round" strokeWidth={11} stroke="url(#paint2_linear_124_14)" d="M52 63L52 6" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" y2="40.5" x2={68} y1={32} x1="77.5" id="paint0_linear_124_14">
                    <stop stopColor="#8E8DF2" />
                    <stop stopColor="#BC8BEC" offset={1} />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" y2="40.5174" x2="36.4196" y1="32.9922" x1="26.1302" id="paint1_linear_124_14">
                    <stop stopColor="#8E8DF2" />
                    <stop stopColor="#BC8BEC" offset={1} />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" y2="34.8174" x2="42.7435" y1="34.0069" x1="55.4548" id="paint2_linear_124_14">
                    <stop stopColor="#8E8DF2" />
                    <stop stopColor="#BC8BEC" offset={1} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text">Explore</span>
          </button>
        </StyledWrapper>
      </div>
    </div>
  );
}

export default AnimatedHeroSection;