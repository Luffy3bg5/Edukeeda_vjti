import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ItemCard from '../components/ItemCard';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [searchInput, setSearchInput] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults(q);
  }, [q]);

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const url = searchQuery ? `/search?q=${searchQuery}` : '/search';
      const { data } = await api.get(url);
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(searchInput ? { q: searchInput } : {});
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      
      {/* Search Header */}
      <div className="mb-10 bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-6">Explore Opportunities</h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for hackathons, internships, events..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
            />
          </div>
          <button type="submit" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all shadow-[0_5px_20px_rgb(147,51,234,0.3)] whitespace-nowrap">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-slate-400 font-medium">Loading opportunities...</div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
          <p className="text-slate-400 max-w-md mx-auto">We couldn't find any opportunities matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
