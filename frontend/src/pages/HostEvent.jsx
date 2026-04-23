import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { categorySchemas } from './HostEventSchema';

const HostEvent = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventType: 'Hackathon',
    title: '', description: '', eligibility: '',
    startDate: '', endDate: '', email: '', gender: 'All', audience: 'Anyone',
    externalLink: '', locationType: 'Online', location: '', domain: [],
    image: null
  });

  const [dynamicData, setDynamicData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventType') setDynamicData({});
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Base64 encoding
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDynamicChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
       setDynamicData({ ...dynamicData, [name]: checked });
    } else {
       setDynamicData({ ...dynamicData, [name]: value });
    }
  };

  const handleDynamicMultiSelect = (name, value, isChecked) => {
    setDynamicData(prev => {
      const arr = prev[name] || [];
      return { ...prev, [name]: isChecked ? [...arr, value] : arr.filter(v => v !== value) };
    });
  };

  const handleDynamicFile = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setDynamicData(prev => ({ ...prev, [name]: reader.result }));
      reader.readAsDataURL(file);
    }
  };
  
  const handleDomainChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      domain: isChecked ? [...prev.domain, value] : prev.domain.filter(d => d !== value)
    }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      eventType: formData.eventType,
      details: {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        email: formData.email,
        gender: formData.gender,
        audience: formData.audience,
        eligibility: formData.eligibility,
        externalLink: formData.externalLink,
        locationType: formData.locationType,
        location: formData.location,
        domain: formData.domain.join(', '), // Stringify multi-select down to robust string
        dynamicFields: dynamicData,
        imageUrl: formData.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" // Inject base64 or fallback
      }
    };

    try {
      await api.post('/host-requests', payload);
      setShowSuccess(true);
      setTimeout(() => navigate('/my-hosting'), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-[#181024] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.15)] text-center">
          <CheckCircle className="w-20 h-20 text-violet-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Request Submitted!</h2>
          <p className="text-slate-400">Your request will be reviewed by our team within 24 hours.</p>
          <p className="text-violet-500/60 font-bold text-sm mt-4">Redirecting to tracker...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="bg-[#181024] rounded-3xl shadow-2xl border border-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <h1 className="text-3xl font-black text-white mb-8 text-center drop-shadow-md relative z-10">Host an Opportunity</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#090514] rounded-full h-3 mb-10 overflow-hidden border border-white/5 relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-violet-500 to-rose-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
          ></motion.div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="relative z-10">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">1. Choose Opportunity Type</h3>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Category</label>
                <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium appearance-none">
                  <option>Cultural Event</option>
                  <option>College Event</option>
                  <option>Conference</option>
                  <option>Course</option>
                  <option>Hackathon</option>
                  <option>Scholarship</option>
                  <option>Competition</option>
                  <option>Internship</option>
                  <option>Loan</option>
                </select>
              </div>
              <button type="submit" className="w-full mt-6 bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-500 transition shadow-[0_0_20px_rgba(139,92,246,0.3)]">Next Step &rarr;</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">2. Basic Details</h3>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Title</label>
                <input type="text" name="title" required placeholder="e.g. Google Summer of Code" value={formData.title} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium placeholder-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Description</label>
                <textarea name="description" required rows="4" placeholder="Describe the opportunity..." value={formData.description} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium placeholder-slate-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Start Date</label>
                  <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">End Date</label>
                  <input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Contact Email</label>
                <input type="email" name="email" required placeholder="host@example.com" value={formData.email} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium placeholder-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Location Type</label>
                <select name="locationType" value={formData.locationType} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium appearance-none">
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Application / External Link</label>
                <input type="url" name="externalLink" required placeholder="https://..." value={formData.externalLink} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium placeholder-slate-600" />
              </div>
              
              {formData.locationType === 'Offline' && (
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Physical Location</label>
                  <input type="text" name="location" required placeholder="City, Venue, etc." value={formData.location} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#090514] text-white font-medium placeholder-slate-600" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Banner Image (Optional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-4 border border-white/10 rounded-xl bg-[#090514] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-violet-600 file:text-white hover:file:bg-violet-500" />
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={handlePrev} className="w-1/3 py-4 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition">&larr; Back</button>
                <button type="submit" className="w-2/3 py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition shadow-[0_0_20px_rgba(139,92,246,0.3)]">Next Step &rarr;</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">3. Additional Information</h3>
              
              {/* Dynamic Generator Engine */}
              {Object.entries(categorySchemas[formData.eventType] || {}).map(([sectionName, fields]) => (
                <div key={sectionName} className="space-y-5 bg-[#090514] p-6 rounded-2xl border border-white/5 shadow-inner">
                  <h4 className="text-lg font-bold text-violet-400 uppercase tracking-widest">{sectionName}</h4>
                  
                  {fields.map(field => (
                    <div key={field.name}>
                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">
                          {field.label} {field.required && <span className="text-rose-500">*</span>}
                        </label>
                        
                        {field.input_type === 'text' && (
                          <input type="text" name={field.name} required={field.required} value={dynamicData[field.name] || ''} onChange={handleDynamicChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#181024] text-white font-medium placeholder-slate-600" />
                        )}

                        {field.input_type === 'number' && (
                          <input type="number" name={field.name} required={field.required} value={dynamicData[field.name] || ''} onChange={handleDynamicChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#181024] text-white font-medium placeholder-slate-600" />
                        )}

                        {field.input_type === 'select' && (
                          <select name={field.name} required={field.required} value={dynamicData[field.name] || ''} onChange={handleDynamicChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none bg-[#181024] text-white font-medium appearance-none capitalize">
                            <option value="">Select {field.label}</option>
                            {field.options.map(opt => <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>)}
                          </select>
                        )}

                        {field.input_type === 'boolean' && (
                          <label className="flex items-center gap-3 text-white font-medium cursor-pointer">
                            <input type="checkbox" name={field.name} required={field.required} checked={!!dynamicData[field.name]} onChange={handleDynamicChange} className="w-5 h-5 rounded text-violet-500 focus:ring-violet-500 bg-[#181024] border border-white/20" />
                            Yes, {field.label.toLowerCase()}
                          </label>
                        )}
                        
                        {field.input_type === 'multiselect' && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-[#181024] p-4 border border-white/10 rounded-xl">
                            {field.options.map(opt => (
                              <label key={opt} className="flex items-center gap-2 text-white font-medium cursor-pointer hover:text-violet-300 text-sm">
                                <input type="checkbox" value={opt} checked={(dynamicData[field.name] || []).includes(opt)} onChange={(e) => handleDynamicMultiSelect(field.name, opt, e.target.checked)} className="w-4 h-4 rounded text-violet-500 focus:ring-violet-500 bg-[#090514] border border-white/20" />
                                {opt}
                              </label>
                            ))}
                          </div>
                        )}

                        {field.input_type === 'file' && (
                          <input type="file" required={field.required} onChange={(e) => handleDynamicFile(e, field.name)} className="w-full p-4 border border-white/10 rounded-xl bg-[#181024] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-violet-600 file:text-white hover:file:bg-violet-500 cursor-pointer" />
                        )}
                    </div>
                  ))}
                </div>
              ))}

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={handlePrev} className="w-1/3 py-4 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition">&larr; Back</button>
                <button type="submit" disabled={isSubmitting} className={`w-2/3 py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition ${isSubmitting ? 'bg-violet-600/50' : 'bg-green-600 hover:bg-green-500'}`}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HostEvent;
