import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: rgba(11,13,23,0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(123,137,228,0.1);
  color: #fff;
  padding: 4rem 0 2rem;

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 4rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .logo {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(120deg, #7B89E4, #BF8AEB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  .description {
    color: #94a3b8;
    margin-bottom: 2rem;
    max-width: 400px;
  }

  .social-links {
    display: flex;
    gap: 1rem;

    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(123,137,228,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(123,137,228,0.2);

      &:hover {
        background: rgba(123,137,228,0.2);
        transform: translateY(-2px);
      }

      svg {
        width: 20px;
        height: 20px;
        color: #7B89E4;
      }
    }
  }

  .footer-links {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #fff;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75rem;

        a {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;

          &:hover {
            color: #7B89E4;
            transform: translateX(4px);
          }
        }
      }
    }
  }

  .bottom-bar {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(123,137,228,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #94a3b8;
    font-size: 0.875rem;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .links {
      display: flex;
      gap: 2rem;

      a {
        color: #94a3b8;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #7B89E4;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="footer-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <Link to="/" className="logo">COSMOS</Link>
            <p className="description">
              Embark on an extraordinary journey through space and time. 
              Discover the wonders of our universe and humanity's next giant leap.
            </p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/technologies">Technologies</Link></li>
              <li><Link to="/solar-system">Solar System</Link></li>
              <li><Link to="/timeline">Timeline</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/news">Latest News</Link></li>
              <li><a href="#research">Research Papers</a></li>
              <li><a href="#gallery">Image Gallery</a></li>
              <li><a href="#videos">Videos</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press Kit</a></li>
            </ul>
          </div>
        </motion.div>

        <div className="bottom-bar">
          <div className="copyright">
            © {new Date().getFullYear()} COSMOS. All rights reserved.
          </div>
          <div className="links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;