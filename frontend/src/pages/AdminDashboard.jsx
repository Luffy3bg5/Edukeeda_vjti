import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Search as SearchIcon, FileText, CheckCircle, BarChart3, Clock, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get('/host-requests');
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/host-requests/${id}/status`, { status });
      setRequests(requests.map(req => req._id === id ? { ...req, status } : req));
    } catch (error) {
      alert('Update failed');
    }
  };

  const filteredRequests = requests.filter(r => r.details.title.toLowerCase().includes(search.toLowerCase()));

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* VIBRANT METRICS BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-rose-500 to-blue-600 p-6 rounded-[2rem] shadow-xl text-white flex items-center justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform"><BarChart3 className="w-32 h-32" /></div>
            <div className="relative z-10">
              <p className="text-blue-100 font-bold uppercase tracking-wider text-xs mb-1">Total Requests</p>
              <h3 className="text-4xl font-black">{requests.length}</h3>
            </div>
         </div>
         <div className="bg-gradient-to-br from-amber-400 to-rose-500 p-6 rounded-[2rem] shadow-xl text-white flex items-center justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform"><Clock className="w-32 h-32" /></div>
            <div className="relative z-10">
              <p className="text-rose-100 font-bold uppercase tracking-wider text-xs mb-1">Needs Action</p>
              <h3 className="text-4xl font-black">{pendingCount}</h3>
            </div>
         </div>
         <div className="bg-gradient-to-br from-violet-400 to-green-600 p-6 rounded-[2rem] shadow-xl text-white flex items-center justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform"><CheckCircle className="w-32 h-32" /></div>
            <div className="relative z-10">
              <p className="text-violet-100 font-bold uppercase tracking-wider text-xs mb-1">Approved Events</p>
              <h3 className="text-4xl font-black">{approvedCount}</h3>
            </div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#181024] border border-gray-100 dark:border-white/5 p-6 rounded-[2rem] shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Approval Inbox</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review pending request submissions from candidates.</p>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search pending requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-[#090514] text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
          />
          <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-slate-500 animate-pulse font-bold tracking-widest uppercase">Fetching Inbox...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredRequests.map((req, index) => (
              <motion.div 
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-[#181024] border border-gray-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 rounded-lg text-xs font-black uppercase tracking-wider">{req.eventType}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${req.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : req.status === 'approved' ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'}`}>
                      {req.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{req.details.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium line-clamp-2">{req.details.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 pt-2">
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#090514] px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400"><FileText className="w-3 h-3" /> User Hash: {req.candidateId ? req.candidateId._id.substring(0,6) : 'Unknown'}</div>
                    <button onClick={() => setExpandedId(expandedId === req._id ? null : req._id)} className="text-violet-500 hover:text-violet-400 uppercase tracking-wider bg-violet-500/10 px-3 py-1.5 rounded-lg transition">
                      {expandedId === req._id ? 'Hide Details' : 'View Full Details'}
                    </button>
                  </div>
                  
                  {expandedId === req._id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {req.details.startDate && (
                          <div className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Start Date</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{new Date(req.details.startDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {req.details.endDate && (
                          <div className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">End Date</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{new Date(req.details.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {req.details.locationType && (
                          <div className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Location</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{req.details.locationType} {req.details.location && `- ${req.details.location}`}</span>
                          </div>
                        )}
                        {req.details.email && (
                          <div className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Contact Email</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{req.details.email}</span>
                          </div>
                        )}
                        {req.details.domain && (
                          <div className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Domains</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{req.details.domain}</span>
                          </div>
                        )}
                      </div>
                      
                      {req.details.dynamicFields && Object.keys(req.details.dynamicFields).length > 0 && (
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-violet-400 mb-3 border-b border-white/5 pb-2">Category-Specific Configurations</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(req.details.dynamicFields).map(([key, value]) => {
                              // If value is a massive base64 string, truncate it visually to "Document Attached"
                              const isBase64 = typeof value === 'string' && value.startsWith('data:');
                              const displayValue = isBase64 ? 'Document Attached (Base64 Binary)' : Array.isArray(value) ? value.join(', ') : String(value);
                              
                              return (
                                <div key={key} className="bg-slate-50 dark:bg-[#090514] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                                  <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{key.replace(/_/g, ' ')}</span>
                                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate block">{displayValue}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col items-center justify-end gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 pt-4 md:pt-0 md:pl-6">
                  {req.status === 'pending' ? (
                    <>
                      <button onClick={() => handleStatusUpdate(req._id, 'approved')} className="w-full md:w-auto px-6 py-3 bg-violet-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition hover:bg-violet-600 shadow-lg shadow-violet-500/30">
                        <CheckCircle2 className="w-5 h-5" /> Approve
                      </button>
                      <button onClick={() => handleStatusUpdate(req._id, 'rejected')} className="w-full md:w-auto px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 font-bold rounded-xl flex items-center justify-center gap-2 transition">
                        <XCircle className="w-5 h-5" /> Reject
                      </button>
                    </>
                  ) : (
                    <div className="text-sm font-bold text-slate-400 dark:text-slate-500 px-4 py-2 bg-slate-50 dark:bg-[#090514] rounded-xl">
                      Task Resolved
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredRequests.length === 0 && !loading && (
              <div className="text-center py-24 bg-white dark:bg-[#181024] rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
                <CheckCircle className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">All caught up!</h3>
                <p className="text-slate-500 font-medium mt-2">Zero pending requests in your queue.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
