import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';

const StyledNews = styled.div`
  .news-grid {
    display: grid;
    gap: 2rem;
  }

  .news-card {
    background: rgba(11,13,23,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(123,137,228,0.4);
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(123,137,228,0.1);
    }
  }

  .image-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16/9;
    
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
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

  .pagination-btn {
    background: rgba(123,137,228,0.1);
    border: 1px solid rgba(123,137,228,0.3);
    color: #7B89E4;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: rgba(123,137,228,0.2);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .search-input {
    background: rgba(11,13,23,0.8);
    border: 1px solid rgba(123,137,228,0.2);
    color: white;
    transition: all 0.3s ease;

    &:focus {
      border-color: rgba(123,137,228,0.4);
      box-shadow: 0 0 0 2px rgba(123,137,228,0.1);
    }
  }

  .filter-btn {
    background: rgba(11,13,23,0.8);
    border: 1px solid rgba(123,137,228,0.2);
    color: white;
    transition: all 0.3s ease;

    &.active {
      background: rgba(123,137,228,0.2);
      border-color: rgba(123,137,228,0.4);
    }

    &:hover {
      border-color: rgba(123,137,228,0.4);
    }
  }
`;

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [sources, setSources] = useState([]);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=12&offset=${(page - 1) * 12}`);
      setArticles(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 12));
      
      // Extract unique news sources
      const uniqueSources = [...new Set(response.data.results.map(article => article.news_site))];
      setSources(uniqueSources);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch articles');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchArticles(newPage);
    window.scrollTo(0, 0);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || article.news_site === selectedSource;
    return matchesSearch && matchesSource;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
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

  return (
    <StyledNews className="pt-20 min-h-screen bg-space-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
            Space News & Discoveries
          </h1>
          <p className="text-gray-400">
            Stay informed about the latest developments in space exploration and astronomy
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input px-4 py-2 rounded-lg flex-grow"
            />
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="search-input px-4 py-2 rounded-lg"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="news-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredArticles.map(article => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="news-card"
            >
              <div className="image-container">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="news-tag text-sm px-3 py-1 rounded-full">
                    {article.news_site}
                  </span>
                  <time className="text-sm text-gray-400">
                    {new Date(article.published_at).toLocaleDateString()}
                  </time>
                </div>
                <h2 className="text-xl font-bold text-white mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {article.summary}
                </p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more font-medium"
                >
                  Read Full Article <ArrowIcon />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn px-4 py-2 rounded-lg"
          >
            Previous
          </button>
          <span className="text-white px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </StyledNews>
  );
}

export default News;