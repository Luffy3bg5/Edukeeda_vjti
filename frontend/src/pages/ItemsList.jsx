import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const ItemsList = ({ type, title, subtitle }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/items?type=${type}`);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (categoryFilter !== 'All' && !item.eligibility?.includes(categoryFilter)) return false;
    if (domainFilter !== 'All' && item.domain !== domainFilter) return false;
    if (locationFilter !== 'All' && item.locationType !== locationFilter) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      <div className="bg-[#131B2F] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">{title}</h1>
          <p className="text-lg text-slate-300 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-[#131B2F] border border-white/5 p-4 rounded-2xl gap-4 shadow-lg">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Student', 'Professional'].map(cat => (
            <button 
              key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-[#0B0F19] text-slate-400 hover:bg-white/5 border border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={domainFilter} 
            onChange={(e) => setDomainFilter(e.target.value)}
            className="w-full md:w-40 p-3 rounded-xl bg-[#0B0F19] border border-white/10 text-slate-300 font-medium focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
          >
            <option value="All">All Domains</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full md:w-40 p-3 rounded-xl bg-[#0B0F19] border border-white/10 text-slate-300 font-medium focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
          >
            <option value="All">All Locations</option>
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#131B2F] border border-white/5 border-dashed rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-2">No {title.toLowerCase()} found</h3>
          <p className="text-slate-400">Try adjusting your filters or search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ItemsList;
