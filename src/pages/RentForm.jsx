import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, doc, updateDoc, Timestamp, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Save, ArrowLeft } from 'lucide-react';

export default function RentForm() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    beneficiaryId: '',
    equipmentId: '',
    conditionOnGiven: 'Ok',
    rentDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const beneficiariesSnap = await getDocs(collection(db, 'beneficiaries'));
      const beneficiariesData = beneficiariesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBeneficiaries(beneficiariesData);

      const equipmentQuery = query(collection(db, 'equipments'), where('status', '==', 'Available'));
      const equipmentSnap = await getDocs(equipmentQuery);
      const equipmentData = equipmentSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEquipment(equipmentData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      const selectedBeneficiary = beneficiaries.find(b => b.id === formData.beneficiaryId);
      const selectedEquipment = equipment.find(e => e.id === formData.equipmentId);

      const rentData = {
        beneficiaryId: formData.beneficiaryId,
        beneficiaryName: selectedBeneficiary.name,
        equipmentId: formData.equipmentId,
        equipmentName: selectedEquipment.equipmentName,
        serialNumber: selectedEquipment.serialNumber,
        conditionOnGiven: formData.conditionOnGiven,
        rentDate: Timestamp.fromDate(new Date(formData.rentDate)),
        createdBy: currentUser.email,
        createdOn: Timestamp.now()
      };

      await addDoc(collection(db, 'rents'), rentData);
      
      // Update equipment status to Rented
      await updateDoc(doc(db, 'equipments', formData.equipmentId), {
        status: 'Rented'
      });

      alert('Rent added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving rent:', error);
      alert('Failed to save rent');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Rent</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Beneficiary *
              </label>
              <select
                name="beneficiaryId"
                value={formData.beneficiaryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose a beneficiary...</option>
                {beneficiaries.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} - {b.contact}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Equipment *
              </label>
              <select
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose equipment...</option>
                {equipment.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.equipmentName} - {e.serialNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition on Given *
              </label>
              <select
                name="conditionOnGiven"
                value={formData.conditionOnGiven}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Ok">Ok</option>
                <option value="UnOk">UnOk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent Date *
              </label>
              <input
                type="date"
                name="rentDate"
                value={formData.rentDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                <span>{loading ? 'Saving...' : 'Save Rent'}</span>
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
