import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, ChevronRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { blogPosts } from '../data/blogs';
import BlogCard from '../components/BlogCard';
import '../styles/blog-details.css';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogPosts.find(post => post.id === parseInt(id));
  const relatedPosts = blogPosts.filter(post => post.category === blog?.category && post.id !== blog?.id).slice(0, 3);
  const [readingProgress, setReadingProgress] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${id}`;
    const text = `Check out this article: ${blog?.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: url
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard! 📋', { duration: 3 });
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <article className="blog-details">
      {/* Reading Progress Bar */}
      <div className="reading-progress">
        <motion.div
          className="progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: readingProgress / 100 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Breadcrumbs */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="breadcrumbs"
      >
        <Link to="/" className="breadcrumb-link">Home</Link>
        <ChevronRight size={16} />
        <Link to="/categories" className="breadcrumb-link">Categories</Link>
        <ChevronRight size={16} />
        <Link to={`/categories/${blog.category}`} className="breadcrumb-link">{blog.category}</Link>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">{blog.title}</span>
      </motion.nav>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="blog-hero-image"
      >
        <img src={blog.image} alt={blog.title} />
        <div className="blog-hero-overlay"></div>
      </motion.div>

      <div className="blog-container">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="blog-header"
        >
          <div className="blog-meta-top">
            <Link to={`/categories/${blog.category}`} className="blog-category">
              {blog.category}
            </Link>
            <span className="blog-read-time">
              <Clock size={14} />
              {blog.readTime} min read
            </span>
          </div>

          <h1 className="blog-title">{blog.title}</h1>

          <div className="blog-author-info">
            <div className="author-details">
              <div className="author-avatar">{blog.author[0]}</div>
              <div>
                <p className="author-name">{blog.author}</p>
                <p className="publish-date">
                  <Calendar size={14} />
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <button className="share-btn" onClick={handleShare}>
              {shared ? <Check size={18} /> : <Share2 size={18} />}
              {shared ? 'Copied!' : 'Share'}
            </button>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="blog-content"
        >
          <p>{blog.content}</p>

          <blockquote className="blog-quote">
            "Quality content is the cornerstone of a successful blog. It's not just about publishing,
            it's about creating meaningful connections with your audience."
          </blockquote>

          <p>
            Throughout this article, we've explored the key strategies and techniques that can help you
            succeed. Remember, the most important thing is to stay consistent, engaged, and always strive
            to provide value to your readers.
          </p>

          <p>
            Whether you're just starting your journey or looking to level up your skills, these principles
            will guide you toward achieving your goals and making a meaningful impact in your field.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="blog-tags"
        >
          {blog.tags.map((tag, idx) => (
            <span key={idx} className="blog-tag">
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="blog-divider"></div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="related-posts"
          >
            <h2>Related Articles</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((post, idx) => (
                <BlogCard key={post.id} blog={post} index={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </article>
  );
}
