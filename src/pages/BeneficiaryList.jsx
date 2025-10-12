import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Layout from '../components/Layout';
import { Plus, Edit, Trash2, Search, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  async function fetchBeneficiaries() {
    try {
      const querySnapshot = await getDocs(collection(db, 'beneficiaries'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBeneficiaries(data);
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await deleteDoc(doc(db, 'beneficiaries', id));
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting beneficiary:', error);
        alert('Failed to delete beneficiary');
      }
    }
  }

  const filteredBeneficiaries = beneficiaries.filter(b =>
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.contact?.includes(searchTerm) ||
    b.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Beneficiaries</h1>
          <button
            onClick={() => navigate('/beneficiaries/new')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Beneficiary</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, contact, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading beneficiaries...</p>
          </div>
        ) : filteredBeneficiaries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <User className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No beneficiaries found</h3>
            <p className="text-gray-500">Start by adding your first beneficiary</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-full p-3">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{beneficiary.name}</h3>
                      <p className="text-sm text-gray-500">{beneficiary.gender}, {beneficiary.age} years</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Father:</span> {beneficiary.fatherName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {beneficiary.contact}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span> {beneficiary.address}
                  </p>
                  {beneficiary.notes && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Notes:</span> {beneficiary.notes}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/beneficiaries/edit/${beneficiary.id}`)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(beneficiary.id)}
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
