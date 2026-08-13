import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import '../styles/blog-card.css';

export default function BlogCard({ blog, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="blog-card"
    >
      <Link to={`/blog/${blog.id}`} className="blog-card-image-wrapper">
        <img src={blog.image} alt={blog.title} className="blog-card-image" />
        <div className="blog-card-overlay">
          <span className="read-more">Read More</span>
        </div>
      </Link>

      <div className="blog-card-content">
        <div className="blog-card-header">
          <Link to={`/categories/${blog.category}`} className="category-badge">
            {blog.category}
          </Link>
          <span className="read-time">
            <Clock size={14} />
            {blog.readTime} min
          </span>
        </div>

        <Link to={`/blog/${blog.id}`} className="blog-card-title">
          <h3>{blog.title}</h3>
        </Link>

        <p className="blog-card-excerpt">{blog.excerpt}</p>

        <div className="blog-card-tags">
          {blog.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="tag">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        <div className="blog-card-footer">
          <div className="blog-meta">
            <span className="author">{blog.author}</span>
            <span className="date">
              <Calendar size={14} />
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <Link to={`/blog/${blog.id}`} className="read-more-btn">
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
