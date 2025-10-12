import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Save, ArrowLeft } from 'lucide-react';

export default function ReturnForm() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rents, setRents] = useState([]);
  const [formData, setFormData] = useState({
    rentId: '',
    conditionOnReturn: 'Ok',
    returnDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    fetchRents();
  }, []);

  async function fetchRents() {
    try {
      const querySnapshot = await getDocs(collection(db, 'rents'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRents(data);
    } catch (error) {
      console.error('Error fetching rents:', error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedRent = rents.find(r => r.id === formData.rentId);

      const returnData = {
        rentId: formData.rentId,
        beneficiaryId: selectedRent.beneficiaryId,
        beneficiaryName: selectedRent.beneficiaryName,
        equipmentId: selectedRent.equipmentId,
        equipmentName: selectedRent.equipmentName,
        serialNumber: selectedRent.serialNumber,
        rentDate: selectedRent.rentDate,
        returnDate: Timestamp.fromDate(new Date(formData.returnDate)),
        conditionOnGiven: selectedRent.conditionOnGiven,
        conditionOnReturn: formData.conditionOnReturn,
        notes: formData.notes,
        createdBy: currentUser.email,
        createdOn: Timestamp.now()
      };

      await addDoc(collection(db, 'returns'), returnData);
      
      // Update equipment status to Available
      await updateDoc(doc(db, 'equipments', selectedRent.equipmentId), {
        status: 'Available',
        condition: formData.conditionOnReturn
      });

      // Delete the rent record
      await deleteDoc(doc(db, 'rents', formData.rentId));

      alert('Return processed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing return:', error);
      alert('Failed to process return');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Process Return</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Rent to Return *
              </label>
              <select
                name="rentId"
                value={formData.rentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a rent...</option>
                {rents.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.beneficiaryName} - {r.equipmentName} ({r.serialNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition on Return *
              </label>
              <select
                name="conditionOnReturn"
                value={formData.conditionOnReturn}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Ok">Ok</option>
                <option value="UnOk">UnOk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Date *
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Any additional notes about the return..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                <span>{loading ? 'Processing...' : 'Process Return'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
