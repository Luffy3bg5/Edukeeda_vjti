import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search, User } from 'lucide-react';
import api from '../services/api';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  // Debounced Search Handler
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const { data } = await api.get(`/search?q=${searchTerm}`);
          setSuggestions(data.results.slice(0, 5));
        } catch (error) {
          console.error('Search error', error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      setSuggestions([]); // close dropdown
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 md:px-8">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          EduKeeda
        </span>
      </Link>

      {/* Center Search (Only if logged in and not Employer?) Let's show globally for everyone */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-12 hidden md:block relative pointer-events-auto" ref={dropdownRef}>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-[#131B2F] border border-white/10 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 transition">
          <Search className="w-4 h-4 text-slate-400 ml-4 hidden sm:block" />
          <input 
            type="text" 
            placeholder="Search for Scholarships, Internships, Hackathons..."
            className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Floating Autocomplete Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-12 left-0 right-0 bg-[#131B2F] border border-white/10 shadow-2xl rounded-2xl overflow-hidden py-2 z-50">
            {suggestions.map((item) => (
              <div 
                key={item._id} 
                onClick={() => { setSearchTerm(''); setSuggestions([]); navigate(`/search?q=${item.title}`); }}
                className="px-4 py-3 hover:bg-white/5 cursor-pointer flex flex-col"
              >
                <span className="font-semibold text-white text-sm">{item.title}</span>
                <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{item.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
               <span className="text-sm font-bold text-white leading-tight">{user.name}</span>
               <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{user.role}</span>
             </div>
             <button 
               onClick={logout}
               className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition"
               title="Logout"
             >
               <LogOut className="w-5 h-5" />
             </button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 px-5 py-2 font-bold text-white bg-white/10 hover:bg-white/20 rounded-full transition">
            <User className="w-4 h-4" /> Login / Signup
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
