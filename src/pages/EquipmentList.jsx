import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Layout from '../components/Layout';
import { Plus, Edit, Trash2, Search, Package, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, []);

  async function fetchEquipment() {
    try {
      const querySnapshot = await getDocs(collection(db, 'equipments'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEquipment(data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await deleteDoc(doc(db, 'equipments', id));
        setEquipment(equipment.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting equipment:', error);
        alert('Failed to delete equipment');
      }
    }
  }

  const filteredEquipment = equipment.filter(e =>
    e.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  const getConditionColor = (condition) => {
    return condition === 'Ok' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Equipment</h1>
          <button
            onClick={() => navigate('/equipment/new')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Equipment</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by equipment name or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading equipment...</p>
          </div>
        ) : filteredEquipment.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No equipment found</h3>
            <p className="text-gray-500">Start by adding your first equipment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-3">
                      <Package className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.equipmentName}</h3>
                      <p className="text-sm text-gray-500">SN: {item.serialNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Source:</span> {item.source}
                  </p>
                  {item.manufacturingDate && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Mfg Date:</span>{' '}
                      {format(item.manufacturingDate.toDate(), 'MMM dd, yyyy')}
                    </p>
                  )}
                  {item.expiryDate && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Expiry:</span>{' '}
                      {format(item.expiryDate.toDate(), 'MMM dd, yyyy')}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/equipment/edit/${item.id}`)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
