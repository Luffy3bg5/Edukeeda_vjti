import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const HostEvent = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventType: 'Hackathon',
    title: '', description: '', eligibility: '',
    externalLink: '', locationType: 'Online', domain: '',
    image: null
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, image: e.target.files[0] });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert to simple JSON payload since Cloudinary requires real keys to use FormData
    const payload = {
      eventType: formData.eventType,
      details: {
        title: formData.title,
        description: formData.description,
        eligibility: formData.eligibility,
        externalLink: formData.externalLink,
        locationType: formData.locationType,
        domain: formData.domain,
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" // Mock image
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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-[#131B2F] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.15)] text-center">
          <CheckCircle className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Request Submitted!</h2>
          <p className="text-slate-400">Your request will be reviewed by our team within 24 hours.</p>
          <p className="text-purple-500/60 font-bold text-sm mt-4">Redirecting to tracker...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="bg-[#131B2F] rounded-3xl shadow-2xl border border-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <h1 className="text-3xl font-black text-white mb-8 text-center drop-shadow-md relative z-10">Host an Opportunity</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#0B0F19] rounded-full h-3 mb-10 overflow-hidden border border-white/5 relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"
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
                <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium appearance-none">
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
              <button type="submit" className="w-full mt-6 bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.3)]">Next Step &rarr;</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">2. Basic Details</h3>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Title</label>
                <input type="text" name="title" required placeholder="e.g. Google Summer of Code" value={formData.title} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium placeholder-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Description</label>
                <textarea name="description" required rows="4" placeholder="Describe the opportunity..." value={formData.description} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium placeholder-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Banner Image (Optional)</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-4 border border-white/10 rounded-xl bg-[#0B0F19] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500" />
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={handlePrev} className="w-1/3 py-4 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition">&larr; Back</button>
                <button type="submit" className="w-2/3 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.3)]">Next Step &rarr;</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">3. Additional Information</h3>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Eligibility Constraints</label>
                <input type="text" name="eligibility" placeholder="e.g. 1st year students only" value={formData.eligibility} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium placeholder-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Domain (if applicable)</label>
                <select name="domain" value={formData.domain} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium appearance-none">
                  <option value="">Select Domain</option>
                  <option value="AI/ML">AI / ML</option>
                  <option value="Web Dev">Web Dev</option>
                  <option value="App Dev">App Dev</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">External Application Link</label>
                <input type="url" name="externalLink" required placeholder="https://..." value={formData.externalLink} onChange={handleChange} className="w-full p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-[#0B0F19] text-white font-medium placeholder-slate-600" />
              </div>
              
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={handlePrev} className="w-1/3 py-4 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition">&larr; Back</button>
                <button type="submit" disabled={isSubmitting} className={`w-2/3 py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] transition ${isSubmitting ? 'bg-purple-600/50' : 'bg-green-600 hover:bg-green-500'}`}>
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
