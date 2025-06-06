import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User, Mail, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 bg-gradient-to-br from-primary-light to-accent-light bg-cover bg-center dark:bg-gray-900 dark:bg-[linear-gradient(135deg,rgba(13,148,136,0.2)_0%,rgba(139,92,246,0.2)_100%)]">
      <div className="w-full max-w-[440px] p-10 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin size={28} className="text-teal-600" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">MoneyMap</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create your account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start managing your finances today!</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-teal-300 dark:focus:ring-teal-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-teal-300 dark:focus:ring-teal-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-teal-300 dark:focus:ring-teal-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-teal-300 dark:focus:ring-teal-100 text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 dark:text-teal-300 font-medium hover:underline transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
