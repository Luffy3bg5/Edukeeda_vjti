import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Trash2, Edit, Search } from 'lucide-react';

const AdminManageItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Get all approved items, we can reuse search API or just getItems
      const { data } = await api.get('/items');
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      alert('Delete failed');
    }
  };

  const filteredItems = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Manage Published Events</h1>
          <p className="text-gray-500 mt-1">Review, edit, or remove approved opportunities.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse">Loading directory...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-sm tracking-wider text-gray-500 uppercase">
                  <th className="p-4 font-semibold">Event Name</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Provider / Domain</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item, index) => (
                  <motion.tr 
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{item.description}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase">{item.type}</span>
                    </td>
                    <td className="p-4">
                      {item.domain ? <span className="text-sm text-gray-700">{item.domain}</span> : <span className="text-sm text-gray-400">N/A</span>}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit (Coming soon)">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No events found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageItems;
