import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogPosts, categories } from '../data/blogs';
import '../styles/categories.css';

export default function Categories() {
  const { category } = useParams();
  const selectedCategory = category || categories[0];
  
  const filteredPosts = blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="categories-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="categories-hero"
      >
        <div className="hero-background">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
        </div>
        <div className="hero-content">
          <h1>Explore by Category</h1>
          <p>Discover articles tailored to your interests</p>
        </div>
      </motion.section>

      <div className="categories-container">
        {/* Category Filter */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="categories-sidebar"
        >
          <div className="filter-header">
            <Filter size={20} />
            <h3>Categories</h3>
          </div>

          <div className="categories-list">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => window.location.href = `/categories/${cat}`}
              >
                <span className="category-dot"></span>
                {cat}
                <span className="category-count">
                  {blogPosts.filter(p => p.category === cat).length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="category-stats"
          >
            <div className="stat">
              <span className="stat-label">Total Posts</span>
              <span className="stat-value">{blogPosts.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Categories</span>
              <span className="stat-value">{categories.length}</span>
            </div>
          </motion.div>
        </motion.aside>

        {/* Posts Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="categories-content"
        >
          <div className="content-header">
            <h2>{selectedCategory}</h2>
            <p>{filteredPosts.length} articles found</p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post, idx) => (
                <BlogCard key={post.id} blog={post} index={idx} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="no-posts"
            >
              <p>No articles found in this category</p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
