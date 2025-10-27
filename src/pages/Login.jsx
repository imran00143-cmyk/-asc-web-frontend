import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';
import Logo from '../assets/Logos/ASM-w.png';
import Brown_Leaves from '../assets/Gumbad/Brown_Leaves.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  function getErrorMessage(code) {
    switch (code) {
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      default:
        return 'Failed to login. Please try again.';
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${Brown_Leaves})` }}
    >      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      {/* Go to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-blue-600 hover:bg-white/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Split Layout Container */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center"
        data-aos="fade-up"
        data-aos-delay="2200"
        data-aos-offset="120"
      >
        {/* Left Side - Logo Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-16"
        data-aos="flip-left"
        >
          <div className="text-center relative">
            <div className="absolute inset-0 bg-white/30 rounded-full filter blur-2xl animate-spin"></div>
            <img 
              src={Logo} 
              alt="ASM Logo" 
              className="h-80 mx-auto mb-12 filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-300 relative z-10" 
            />
            <h1 className="text-5xl font-bold text-white mb-6 text-shadow-lg relative z-10">
              Welcome to ASM
            </h1>
            <p className="text-xl text-white/90 relative z-10">
              Empowering Communities Through Healthcare Support
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-3xl border border-white/10">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">-- Sign in here --</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/60 text-white
                         focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm
                         bg-white/10 backdrop-blur-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-white/60 text-white
                         focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm
                         bg-white/10 backdrop-blur-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-200 bg-red-500/20 backdrop-blur-sm p-4 rounded-lg border border-red-500/30">
              <AlertCircle className="w-5 h-5 mr-2 text-red-300" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-white/20 text-sm font-medium rounded-lg text-white
                       bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
                       transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
