import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CandidateHome from './pages/CandidateHome';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageItems from './pages/AdminManageItems';
import HostEvent from './pages/HostEvent';
import ItemsList from './pages/ItemsList';
import MyHosting from './pages/MyHosting';
import Search from './pages/Search';
import { useAuth, AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ children, employerOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (employerOnly && user.role !== 'employer') return <Navigate to="/" />;
  return children;
};

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-purple-500/30 font-sans">
      <Navbar />
      {user && <Sidebar />}
      <main className={`pt-16 ${user ? 'md:ml-64' : ''} min-h-screen transition-all duration-300 pb-10 relative z-0`}>
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              {user?.role === 'employer' ? <AdminDashboard /> : <CandidateHome />}
            </ProtectedRoute>
          } />

          {/* Employer Routes */}
          <Route path="/admin/requests" element={<ProtectedRoute employerOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage" element={<ProtectedRoute employerOnly><AdminManageItems /></ProtectedRoute>} />
          
          {/* Candidate Routes */}
          <Route path="/host-event" element={<ProtectedRoute><HostEvent /></ProtectedRoute>} />
          <Route path="/my-hosting" element={<ProtectedRoute><MyHosting /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          
          <Route path="/scholarships" element={
            <ProtectedRoute><ItemsList type="Scholarship" title="Scholarships" subtitle="Find financial aid to fund your dreams." /></ProtectedRoute>
          } />
          <Route path="/hackathons" element={
            <ProtectedRoute><ItemsList type="Hackathon" title="Hackathons" subtitle="Code, build, and win global challenges." /></ProtectedRoute>
          } />
          <Route path="/internships" element={
            <ProtectedRoute><ItemsList type="Internship" title="Internships" subtitle="Gain real-world experience and accelerate your career." /></ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute><ItemsList type="Event" title="Events & Workshops" subtitle="Attend global events and network." /></ProtectedRoute>
          } />
          <Route path="/competitions" element={
            <ProtectedRoute><ItemsList type="Competition" title="Competitions" subtitle="Showcase your skills." /></ProtectedRoute>
          } />
          <Route path="/loans" element={
            <ProtectedRoute><ItemsList type="Loan" title="Education Loans" subtitle="Get funding for your higher education." /></ProtectedRoute>
          } />

        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
