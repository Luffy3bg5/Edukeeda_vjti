import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Briefcase, Trophy, GraduationCap, CalendarDays, ClipboardCheck, BookOpen, UserCircle, ShieldAlert, MonitorPlay } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  
  const candidateLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Internships', path: '/internships', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Competitions', path: '/competitions', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Scholarships', path: '/scholarships', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Hackathons', path: '/hackathons', icon: <MonitorPlay className="w-5 h-5" /> },
    { name: 'Cultural Events', path: '/cultural-events', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'College Events', path: '/college-events', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Conferences', path: '/conferences', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Education Loan', path: '/loans', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'My Hosting', path: '/my-hosting', icon: <UserCircle className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { name: 'Pending Approvals', path: '/admin/requests', icon: <ShieldAlert className="w-5 h-5" /> },
    { name: 'Manage Events', path: '/admin/manage', icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  const links = user?.role === 'employer' ? adminLinks : candidateLinks;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#0B0F19] border-r border-white/5 overflow-y-auto hidden md:block">
      <div className="p-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-4">
          {user?.role === 'employer' ? 'Admin Controls' : 'Explore'}
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {user?.role === 'candidate' && (
          <div className="mt-8 px-3">
            <NavLink to="/host-event" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              + Host an Event
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
