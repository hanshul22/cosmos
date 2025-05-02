import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';

const NewsSection = styled.section`
  background: #0B0D17;
  padding: 4rem 0;
  color: #fff;
  min-height: 100vh;
  overflow: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    h2 {
      font-family: 'Orbitron', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(120deg, #7B89E4, #BF8AEB);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .recently-published {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      color: #fff;

      .dot {
        width: 8px;
        height: 8px;
        background: #FF6B6B;
        border-radius: 50%;
      }
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .main-article {
    position: relative;
    height: 500px;
    border-radius: 1rem;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      background: linear-gradient(transparent, rgba(11, 13, 23, 0.9));
      
      .tag {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: rgba(123, 137, 228, 0.2);
        border: 1px solid #7B89E4;
        border-radius: 2rem;
        margin-bottom: 1rem;
        backdrop-filter: blur(5px);
      }

      .read-time {
        color: #BF8AEB;
        margin-bottom: 0.5rem;
      }

      h3 {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    }
  }

  .secondary-articles {
    display: grid;
    gap: 2rem;

    .article {
      position: relative;
      height: 240px;
      border-radius: 1rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        background: linear-gradient(transparent, rgba(11, 13, 23, 0.9));

        .tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(123, 137, 228, 0.2);
          border: 1px solid #7B89E4;
          border-radius: 2rem;
          margin-bottom: 0.5rem;
          backdrop-filter: blur(5px);
          font-size: 0.875rem;
        }

        .read-time {
          color: #BF8AEB;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }
      }
    }
  }

  .news-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    .news-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background: rgba(123, 137, 228, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      img {
        width: 80px;
        height: 80px;
        border-radius: 0.5rem;
        object-fit: cover;
      }

      .content {
        .tag {
          display: inline-block;
          font-size: 0.75rem;
          color: #7B89E4;
          margin-bottom: 0.5rem;
        }

        .read-time {
          font-size: 0.875rem;
          color: #BF8AEB;
          margin-bottom: 0.25rem;
        }

        h4 {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .featured-grid {
      grid-template-columns: 1fr;
    }

    .news-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .news-list {
      grid-template-columns: 1fr;
    }
  }
`;

const FeaturedNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

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

  const mainArticle = blogs[0];
  const secondaryArticles = blogs.slice(1, 3);
  const newsListArticles = blogs.slice(3, 6);

  const getReadTime = (summary) => {
    const wordsPerMinute = 200;
    const words = summary.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} MIN READ`;
  };

  return (
    <NewsSection ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured News</h2>
          <div className="recently-published">
            Recently Published
            <span className="dot"></span>
          </div>
        </motion.div>

        <div className="featured-grid">
          {mainArticle && (
            <motion.article 
              className="main-article"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={mainArticle.image_url} alt={mainArticle.title} />
              <div className="content">
                <span className="tag">{mainArticle.news_site}</span>
                <div className="read-time">{getReadTime(mainArticle.summary)}</div>
                <h3>{mainArticle.title}</h3>
              </div>
            </motion.article>
          )}

          <div className="secondary-articles">
            {secondaryArticles.map((article, index) => (
              <motion.article 
                key={article.id}
                className="article"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              >
                <img src={article.image_url} alt={article.title} />
                <div className="content">
                  <span className="tag">{article.news_site}</span>
                  <div className="read-time">{getReadTime(article.summary)}</div>
                  <h3>{article.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div 
          className="news-list"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {newsListArticles.map((article, index) => (
            <motion.div 
              key={article.id}
              className="news-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img src={article.image_url} alt={article.title} />
              <div className="content">
                <span className="tag">{article.news_site}</span>
                <div className="read-time">{getReadTime(article.summary)}</div>
                <h4>{article.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </NewsSection>
  );
};

export default FeaturedNews;