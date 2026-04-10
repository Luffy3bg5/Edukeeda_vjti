import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CandidateHome = () => {
  const modules = [
    { title: 'Internships', desc: 'Accelerate your career with top companies.', link: '/internships', color: 'from-blue-400 to-indigo-500', shadow: 'shadow-blue-500/30' },
    { title: 'Scholarships', desc: 'Secure funding for your future dreams.', link: '/scholarships', color: 'from-orange-400 to-rose-500', shadow: 'shadow-rose-500/30' },
    { title: 'Hackathons', desc: 'Code, build, and conquer challenges.', link: '/hackathons', color: 'from-violet-400 to-purple-600', shadow: 'shadow-purple-500/30' },
    { title: 'Competitions', desc: 'Showcase your skills to the world.', link: '/competitions', color: 'from-emerald-400 to-teal-500', shadow: 'shadow-teal-500/30' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      
      {/* VIBRANT HERO SECTION */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 shadow-2xl border border-white/10">
        
        {/* Animated Abstract Art Background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-500/40 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/40 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
           <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-purple-500/40 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
           {/* Dark overlay for text readability */}
           <div className="absolute inset-0 bg-[#0B0F19]/40 z-0"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-10">
          <div className="md:w-[55%] space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              Shape Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-400 drop-shadow-sm">
                Destiny
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xl text-indigo-100/90 font-medium leading-relaxed max-w-lg"
            >
              The ultimate vibrant hub for thousands of internships, breathtaking hackathons, and global scholarships curated specifically for you.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <NavLink to="/hackathons" className="px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_10px_30px_rgb(255,255,255,0.2)]">
                Explore Hackathons
              </NavLink>
              <NavLink to="/scholarships" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md">
                Find Scholarships
              </NavLink>
            </motion.div>
          </div>

          <div className="md:w-[45%] flex justify-center pb-8 md:pb-0">
             <motion.img 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
               alt="Students collaborating" 
               className="w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 object-cover aspect-square ring-4 ring-purple-500/30"
             />
          </div>
        </div>
      </section>

      {/* COLORFUL MODULES GRID */}
      <section className="relative z-10 pt-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">Discover Opportunities</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <NavLink to={mod.link} className={`block h-full p-8 rounded-[2rem] text-white bg-gradient-to-br ${mod.color} shadow-lg hover:${mod.shadow} hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}>
                
                {/* Decorative Pattern inside Card */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-black mb-3 drop-shadow-sm">{mod.title}</h3>
                     <p className="text-white/90 font-semibold leading-snug drop-shadow-sm">{mod.desc}</p>
                   </div>
                   <div className="mt-8 flex justify-end">
                     <div className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold shadow-md group-hover:translate-x-2 transition-transform">
                       &rarr;
                     </div>
                   </div>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="mt-12 bg-gradient-to-r from-amber-200 to-yellow-400 rounded-3xl p-8 md:p-12 shadow-xl border border-yellow-300 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="md:w-2/3">
            <h2 className="text-3xl font-black text-orange-900 mb-3">Want to Host an Event?</h2>
            <p className="text-orange-900/80 font-bold text-lg">Partner with EduKeeda to reach millions of talented candidates globally.</p>
         </div>
         <div>
            <NavLink to="/host-event" className="px-8 py-4 bg-orange-900 text-white font-black rounded-2xl shadow-lg hover:bg-orange-800 hover:scale-105 transition-all text-center inline-block">
               Host Now &rarr;
            </NavLink>
         </div>
      </section>

    </div>
  );
};

export default CandidateHome;
