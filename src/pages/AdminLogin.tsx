import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, Home } from 'lucide-react';
import { authenticateAdmin, createAdminSession, isAdminAuthenticated } from '../utils/auth';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (authenticateAdmin(credentials.username, credentials.password)) {
      createAdminSession();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center px-4 py-2 bg-card/80 backdrop-blur-xl text-card-foreground hover:text-primary hover:bg-card/90 rounded-xl transition-all duration-300 border border-border/50 shadow-lg"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-card/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-professional-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-card-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              Access the certificate management system
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-card-foreground mb-3">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground transition-all duration-300"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-card-foreground mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground transition-all duration-300"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 bg-professional-gradient text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Shield className="mr-3 h-5 w-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>



          {/* Quick Access Links */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-3">Quick Access:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/verify')}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Certificate Verification
              </button>
              <span className="text-xs text-muted-foreground">•</span>
              <button
                onClick={() => navigate('/')}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Main Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;