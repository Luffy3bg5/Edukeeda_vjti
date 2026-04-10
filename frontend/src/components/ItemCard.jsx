import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-[#131B2F] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 group flex flex-col h-full relative cursor-pointer">
      <div className="h-40 bg-gradient-to-r from-purple-900 to-indigo-900 relative overflow-hidden">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <Tag className="w-12 h-12 text-white" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
          {item.type}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-3 uppercase tracking-wide">
          <MapPin className="w-4 h-4" /> {item.locationType}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">{item.title}</h3>
        <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed">{item.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Calendar className="w-4 h-4" /> Posted recently
          </div>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-bold flex items-center gap-1 transition-colors">
            Apply Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
