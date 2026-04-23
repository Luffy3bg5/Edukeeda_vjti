import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [step, setStep] = useState(1);
  const { registerCandidate } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    role: 'candidate', educationDetails: '', category: 'Student',
    experienceLevel: 'Beginner', domain: 'Engineering',
    skills: '', interests: '', location: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        interests: formData.interests.split(',').map(i => i.trim()),
      };
      await registerCandidate(formattedData);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  const inputStyles = "mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors";
  const labelStyles = "block text-sm font-medium text-slate-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090514] py-12 px-4 selection:bg-violet-500/30">
      <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Create Account</h2>
        
        {/* TAB BAR FOR SIGN IN & SIGN UP */}
        <div className="flex bg-slate-900 p-1 rounded-2xl mb-8 border border-slate-700">
          <Link to="/login" className="flex-1 py-3 text-center rounded-xl font-bold text-sm text-slate-400 hover:text-slate-200 transition-all">Sign In</Link>
          <button className="flex-1 py-3 rounded-xl font-bold text-sm bg-slate-800 text-white shadow-sm border border-slate-600">Sign Up</button>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-8">
          <motion.div 
            className="bg-violet-500 h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 text-slate-100">Basic Details</h3>
              <div>
                <label className={labelStyles}>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Phone</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className={inputStyles} />
              </div>
              <button type="submit" className="w-full bg-violet-600 text-white font-medium p-3 rounded-md mt-6 shadow-sm hover:bg-violet-500 transition">Next Step</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 text-slate-100">Professional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyles}>Account Type</label>
                  <select name="role" value={formData.role} onChange={handleChange} className={inputStyles}>
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={inputStyles}>
                    <option>Student</option>
                    <option>Professional</option>
                    <option>Others</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className={inputStyles}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>Industry Domain</label>
                  <select name="domain" value={formData.domain} onChange={handleChange} className={inputStyles}>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelStyles}>Education Details (College/Degree)</label>
                <input type="text" name="educationDetails" required value={formData.educationDetails} onChange={handleChange} className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Location</label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} className={inputStyles} />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={handlePrev} className="w-1/2 bg-slate-700 text-slate-300 font-medium p-3 rounded-md hover:bg-slate-600 transition">Back</button>
                <button type="submit" className="w-1/2 bg-violet-600 text-white font-medium p-3 rounded-md shadow-sm hover:bg-violet-500 transition">Next Step</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 text-slate-100">Skills & Interests</h3>
              <div>
                <label className={labelStyles}>Skills (comma separated)</label>
                <input type="text" name="skills" required placeholder="React, Node.js, Python" value={formData.skills} onChange={handleChange} className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Interests (comma separated)</label>
                <input type="text" name="interests" required placeholder="Web Dev, AI, Design" value={formData.interests} onChange={handleChange} className={inputStyles} />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={handlePrev} className="w-1/2 bg-slate-700 text-slate-300 font-medium p-3 rounded-md hover:bg-slate-600 transition">Back</button>
                <button type="submit" className="w-1/2 bg-violet-600 text-white font-medium p-3 rounded-md shadow-sm hover:bg-violet-500 transition">Complete Registration</button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
