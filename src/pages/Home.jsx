import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogs';
import blogImage from '../assets/blog image.png';
import '../styles/home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Keyboard shortcut: Ctrl+K for search
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      setIsSearching(true);
      const results = blogPosts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletter.trim()) {
      toast.error('Please enter a valid email', { duration: 3 });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletter)) {
      toast.error('Please enter a valid email address', { duration: 3 });
      return;
    }

    setNewsletterLoading(true);
    setTimeout(() => {
      toast.success(`You'll receive updates at ${newsletter}! 📧`, {
        duration: 4,
        icon: '🎉'
      });
      setNewsletter('');
      setNewsletterLoading(false);
    }, 800);
  };

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <div className="hero-background">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text"
          >
            <h1>
              <span className="gradient-text">Welcome to BlogHub</span>
            </h1>
            <p>
              Discover insightful stories, expert tips, and inspiring content across technology,
              lifestyle, travel, education, and business.
            </p>
            <div className="hero-buttons">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
                onClick={() => navigate('/categories')}
              >
                Explore Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
                onClick={() => navigate('/about')}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-image"
          >
            <div className="blog-illustration-card">
              <img src={blogImage} alt="Blog Illustration" className="blog-illustration" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="search-section"
      >
        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={24} />
            <input
              type="text"
              placeholder="Search blogs by title, keywords, or tags... (Ctrl+K)"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          {/* Search Results */}
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="search-results"
            >
              {searchResults.length > 0 ? (
                <div>
                  <p className="results-count">Found {searchResults.length} results</p>
                  <div className="results-grid">
                    {searchResults.map((post, idx) => (
                      <BlogCard key={post.id} blog={post} index={idx} />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="no-results">
                  No blogs found matching "{searchQuery}". Try different keywords.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Featured Post */}
      {!isSearching && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="featured-section"
        >
          <div className="section-header">
            <div>
              <h2>Featured Story</h2>
              <p>Our most popular and trending article</p>
            </div>
            <TrendingUp className="section-icon" size={28} />
          </div>

          <Link to={`/blog/${featuredPost.id}`} className="featured-post">
            <div className="featured-image-wrapper">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <div className="featured-overlay"></div>
            </div>
            <div className="featured-content">
              <div className="featured-header">
                <span className="featured-badge">{featuredPost.category}</span>
                <span className="featured-date">{new Date(featuredPost.date).toLocaleDateString()}</span>
              </div>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <div className="featured-footer">
                <span className="author">By {featuredPost.author}</span>
                <span className="cta">Read Full Story →</span>
              </div>
            </div>
          </Link>
        </motion.section>
      )}

      {/* Recent Posts */}
      {!isSearching && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="recent-posts-section"
        >
          <div className="section-header">
            <div>
              <h2>Recent Articles</h2>
              <p>Stay updated with our latest posts</p>
            </div>
          </div>

          <div className="posts-grid">
            {recentPosts.map((post, idx) => (
              <BlogCard key={post.id} blog={post} index={idx} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="newsletter-section"
      >
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest articles delivered to your inbox every week</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              disabled={newsletterLoading}
              required 
            />
            <button type="submit" className="newsletter-btn" disabled={newsletterLoading}>
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
