import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (!email || !password) {
        const errorMsg = 'Please fill in all fields';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      const user = login(email, password);
      if (user) {
        toast.success(`Welcome back, ${user.name}! 👋`, { duration: 4 });
        setTimeout(() => navigate('/'), 500);
      } else {
        const errorMsg = 'Invalid email or password. Try: test@example.com / password123';
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
            <h2>Welcome Back!</h2>
            <p>Access your personalized blog experience and stay updated with your favorite content.</p>
            <ul className="features-list">
              <li>✓ Read your favorite blogs</li>
              <li>✓ Save articles</li>
              <li>✓ Personalized recommendations</li>
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

            <h1>Sign In</h1>
            <p>Sign in to access your account</p>

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
                <label>Email Address</label>
                <div className="form-input-wrapper">
                  <input
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="form-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
