import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#060910] text-slate-400 py-12 px-4 shadow-[0_-10px_30px_rgb(0,0,0,0.5)] border-t border-slate-800 z-50 relative mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-black text-white mb-4">
            Edu<span className="text-purple-500">Keeda</span>
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            The ultimate hub for candidates to discover global hackathons, internships, scholarships, and career-accelerating opportunities.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Opportunities</h3>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/hackathons" className="hover:text-purple-400 transition">Hackathons</NavLink></li>
            <li><NavLink to="/internships" className="hover:text-purple-400 transition">Internships</NavLink></li>
            <li><NavLink to="/scholarships" className="hover:text-purple-400 transition">Scholarships</NavLink></li>
            <li><NavLink to="/competitions" className="hover:text-purple-400 transition">Competitions</NavLink></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/help-center" className="hover:text-purple-400 transition">Help Center</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-purple-400 transition">Terms of Service</NavLink></li>
            <li><NavLink to="/privacy" className="hover:text-purple-400 transition">Privacy Policy</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-purple-400 transition">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Social / Newsletter */}
        <div>
           <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Follow Us</h3>
           <p className="text-sm mb-4">Stay connected via our social channels for live updates.</p>
           <div className="flex flex-wrap gap-4 mt-6">
             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">X</a>
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">in</a>
             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">ig</a>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">gh</a>
             <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">dc</a>
             <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition cursor-pointer font-black text-sm shadow-md">yt</a>
           </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} EduKeeda. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
