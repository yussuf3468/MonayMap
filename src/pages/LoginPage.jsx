// LoginPage.jsx with TailwindCSS styles
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 bg-gradient-to-br from-primary-light to-accent-light bg-cover bg-center dark:bg-gray-900 dark:bg-[linear-gradient(135deg,rgba(13,148,136,0.2)_0%,rgba(139,92,246,0.2)_100%)]">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin size={28} className="text-primary" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">MoneyMap</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Sign in to your account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Please enter your details.</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-100 border-l-4 border-red-500 text-red-500 rounded text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline dark:text-primary-light">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline dark:text-primary-light">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;