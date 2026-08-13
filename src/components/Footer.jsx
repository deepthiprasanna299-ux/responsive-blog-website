import { Link } from 'react-router-dom';
import { Share2, MessageSquare, Compass, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h3>About BlogHub</h3>
            <p>
              A modern, responsive blog platform delivering insightful content on technology,
              lifestyle, travel, education, and business. Join our community of readers and writers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h3>Categories</h3>
            <ul>
              <li><Link to="/categories/Technology">Technology</Link></li>
              <li><Link to="/categories/Lifestyle">Lifestyle</Link></li>
              <li><Link to="/categories/Travel">Travel</Link></li>
              <li><Link to="/categories/Education">Education</Link></li>
              <li><Link to="/categories/Business">Business</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="footer-section follow-section"
          >
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Share2 size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Compass size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Heart size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; 2024 BlogHub. All rights reserved.</p>
          <button onClick={scrollToTop} className="scroll-to-top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
