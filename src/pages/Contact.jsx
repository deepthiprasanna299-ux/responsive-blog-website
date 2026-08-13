import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate form submission
      setTimeout(() => {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          duration: 4,
          icon: '✉️'
        });
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
      }, 1000);
    } else {
      toast.error('Please fix the errors below', { duration: 3 });
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="contact-hero"
      >
        <div className="hero-background">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
        </div>
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us a message!</p>
        </div>
      </motion.section>

      <div className="contact-container">
        <div className="contact-content">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <h2>Contact Information</h2>
            <p>Have questions? We're here to help. Reach out to us through any of these channels.</p>

            <div className="info-cards">
              <motion.div
                whileHover={{ y: -5 }}
                className="info-card"
              >
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <h3>Email</h3>
                <p>hello@bloghub.com</p>
                <a href="mailto:hello@bloghub.com">Send Email</a>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="info-card"
              >
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <a href="tel:+15551234567">Call Us</a>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="info-card"
              >
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <h3>Address</h3>
                <p>123 Blog Street, Content City, CC 12345</p>
                <a href="#">View Map</a>
              </motion.div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="contact-form-wrapper"
          >
            <div className="contact-form">
              <h2>Send us a Message</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  <CheckCircle size={32} />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon!</p>
                </motion.div>
              )}

              {!submitted && (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? 'error' : ''}
                    />
                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'error' : ''}
                    ></textarea>
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="submit-btn"
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
