import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, ChevronRight, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyHosting = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const { data } = await api.get('/host-requests/my-requests');
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50 text-green-700', text: 'Approved' };
      case 'rejected': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 text-red-700', text: 'Rejected' };
      default: return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50 text-yellow-700', text: 'Pending Review' };
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="bg-[#131B2F] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6 mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white">My Hosting Requests</h1>
            <p className="text-slate-400 font-medium mt-2">Track the status of your submitted events and opportunities.</p>
          </div>
          <Link to="/host-event" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
            Host New <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>)}
          </div>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 relative z-10">
            {requests.map((req, index) => {
              const statusConfig = getStatusConfig(req.status);
              const StatusIcon = statusConfig.icon;
              return (
                <motion.div 
                  key={req._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0B0F19] p-6 rounded-2xl border border-white/5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl hover:border-white/10 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-black uppercase tracking-wider">{req.eventType}</span>
                      <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded inline-block">{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{req.details.title}</h3>
                    <p className="text-sm font-medium text-slate-400 line-clamp-1">{req.details.description}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ${statusConfig.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} whitespace-nowrap`}>
                    <StatusIcon className="w-5 h-5" />
                    {statusConfig.text}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0B0F19] rounded-3xl border border-dashed border-white/10 relative z-10">
            <FilePlus className="w-16 h-16 text-purple-500/40 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white">No requests yet</h3>
            <p className="text-slate-400 font-medium mt-2 mb-8">You haven't submitted any events to be hosted.</p>
            <Link to="/host-event" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              Start Hosting
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHosting;
