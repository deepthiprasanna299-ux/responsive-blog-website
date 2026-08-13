import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        const errorMsg = 'Please fill in all fields';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        const errorMsg = 'Passwords do not match';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        const errorMsg = 'Password must be at least 6 characters';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      try {
        signup(formData);
        toast.success('Account created successfully! Welcome to BlogHub 🎉', { duration: 4 });
        setTimeout(() => navigate('/'), 500);
      } catch (err) {
        const errorMsg = 'An error occurred during signup';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Decorative */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="auth-decoration"
        >
          <div className="decoration-blob blob-1"></div>
          <div className="decoration-blob blob-2"></div>
          <div className="decoration-blob blob-3"></div>
          <div className="decoration-content">
            <h2>Join Our Community</h2>
            <p>Create an account to unlock a personalized blog experience and connect with our readers.</p>
            <ul className="features-list">
              <li><Check size={18} /> Create your profile</li>
              <li><Check size={18} /> Personalized feed</li>
              <li><Check size={18} /> Save your favorites</li>
            </ul>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="auth-form-wrapper"
        >
          <div className="auth-form">
            <Link to="/" className="auth-logo">
              <span>✨</span>
              <span>BlogHub</span>
            </Link>

            <h1>Create Account</h1>
            <p>Join thousands of readers worldwide</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <div className="form-input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="form-input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="form-input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="form-input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Creating account...' : (
                  <>
                    Sign Up
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
