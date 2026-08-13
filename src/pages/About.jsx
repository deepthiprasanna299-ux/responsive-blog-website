import { motion } from 'framer-motion';
import { Users, Target, Heart, Zap } from 'lucide-react';
import '../styles/about.css';

export default function About() {
  const values = [
    {
      icon: <Target size={32} />,
      title: 'Quality Content',
      description: 'We are committed to delivering high-quality, well-researched articles that add value to our readers\' lives.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community First',
      description: 'Building a thriving community of readers and writers who share knowledge and inspire each other.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Passion Driven',
      description: 'Every article is written with genuine passion and dedication to our topics and our audience.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Innovation',
      description: 'We continuously evolve and innovate to bring you the latest trends and insights in every category.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="about-hero"
      >
        <div className="hero-background">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
        </div>
        <div className="hero-content">
          <h1>About BlogHub</h1>
          <p>Where Ideas Meet Inspiration</p>
        </div>
      </motion.section>

      <div className="about-container">
        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mission-section"
        >
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At BlogHub, our mission is to be a beacon of knowledge and inspiration for readers worldwide.
              We believe in the power of well-crafted content to educate, inspire, and transform lives.
            </p>
            <p>
              Whether you're interested in technology trends, lifestyle tips, travel adventures, educational
              insights, or business strategies, we have something for everyone. Our diverse team of writers
              and editors work tirelessly to bring you the most relevant, engaging, and valuable content.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mission-image"
            viewport={{ once: true }}
          >
            <div className="image-placeholder">
              <span>📖</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="values-section"
        >
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="value-card"
                whileHover={{ y: -10 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="stats-section"
        >
          <div className="stats-grid">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="stat-card"
            >
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Readers</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="stat-card"
            >
              <span className="stat-number">500+</span>
              <span className="stat-label">Articles Published</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="stat-card"
            >
              <span className="stat-number">5</span>
              <span className="stat-label">Major Categories</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="stat-card"
            >
              <span className="stat-number">100+</span>
              <span className="stat-label">Expert Contributors</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="team-section"
        >
          <h2>Why Choose BlogHub?</h2>
          <div className="benefits-list">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="benefit-item"
            >
              <span className="benefit-number">1</span>
              <div>
                <h3>Expert Contributors</h3>
                <p>All articles are written by industry experts with years of experience in their respective fields.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="benefit-item"
            >
              <span className="benefit-number">2</span>
              <div>
                <h3>Regular Updates</h3>
                <p>We publish fresh content regularly, ensuring you always have access to the latest insights and trends.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="benefit-item"
            >
              <span className="benefit-number">3</span>
              <div>
                <h3>Diverse Content</h3>
                <p>From technology to lifestyle, our diverse categories ensure there's something for everyone.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="benefit-item"
            >
              <span className="benefit-number">4</span>
              <div>
                <h3>Engaging Community</h3>
                <p>Join thousands of readers who share your interests and engage with meaningful content daily.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
