import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, any login works
    localStorage.setItem('isAdminAuth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 w-full max-w-md neon-glow"
        style={{ background: 'rgba(10, 10, 15, 0.8)' }}
      >
        <div className="text-center mb-8">
           <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">KEINEN</h2>
           <p className="text-[11px] font-bold tracking-[0.4em] text-accent-red uppercase">BUILT ON FAITH</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="System Username"
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-accent-red focus:outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="password" 
              placeholder="Access Key"
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-accent-red focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full btn-primary py-4 rounded-xl text-lg font-bold"
          >
            INITIALIZE SESSION
          </button>
        </form>


      </motion.div>
    </div>
  );
};

export default Login;
