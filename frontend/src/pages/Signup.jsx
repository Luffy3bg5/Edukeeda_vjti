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
    educationDetails: '', category: 'Student',
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create Candidate Account</h2>
        
        {/* TAB BAR FOR SIGN IN & SIGN UP */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8 border border-gray-200">
          <Link to="/login" className="flex-1 py-3 text-center rounded-xl font-bold text-sm text-gray-500 hover:text-gray-700 transition-all">Sign In</Link>
          <button className="flex-1 py-3 rounded-xl font-bold text-sm bg-white text-gray-900 shadow-sm border border-gray-200">Sign Up</button>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <motion.div 
            className="bg-primary h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Basic Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <button type="submit" className="w-full bg-primary text-white p-3 rounded-md mt-6 shadow-sm hover:opacity-90 transition">Next Step</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Professional Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md">
                  <option>Student</option>
                  <option>Professional</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Education Details (College/Degree)</label>
                <input type="text" name="educationDetails" required value={formData.educationDetails} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={handlePrev} className="w-1/2 bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition">Back</button>
                <button type="submit" className="w-1/2 bg-primary text-white p-3 rounded-md shadow-sm hover:opacity-90 transition">Next Step</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Skills & Interests</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input type="text" name="skills" required placeholder="React, Node.js, Python" value={formData.skills} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interests (comma separated)</label>
                <input type="text" name="interests" required placeholder="Web Dev, AI, Design" value={formData.interests} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={handlePrev} className="w-1/2 bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition">Back</button>
                <button type="submit" className="w-1/2 bg-green-500 text-white p-3 rounded-md shadow-sm hover:opacity-90 transition">Submit Registration</button>
              </div>
            </motion.div>
          )}
        </form>
        
        {/* Empty space replacing old text */}
        <div className="mt-6"></div>
      </div>
    </div>
  );
};

export default Signup;
