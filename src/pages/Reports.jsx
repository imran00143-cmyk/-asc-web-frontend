import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Layout from '../components/Layout';
import { FileText, Download, Users, Package, ShoppingCart, RotateCcw, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function Reports() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    totalEquipment: 0,
    activeRents: 0,
    totalReturns: 0,
    availableEquipment: 0,
    rentedEquipment: 0
  });
  const [rents, setRents] = useState([]);
  const [returns, setReturns] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    try {
      const beneficiariesSnap = await getDocs(collection(db, 'beneficiaries'));
      const equipmentSnap = await getDocs(collection(db, 'equipments'));
      const rentsSnap = await getDocs(collection(db, 'rents'));
      const returnsSnap = await getDocs(collection(db, 'returns'));

      const equipmentData = equipmentSnap.docs.map(doc => doc.data());
      const availableCount = equipmentData.filter(e => e.status === 'Available').length;
      const rentedCount = equipmentData.filter(e => e.status === 'Rented').length;

      setStats({
        totalBeneficiaries: beneficiariesSnap.size,
        totalEquipment: equipmentSnap.size,
        activeRents: rentsSnap.size,
        totalReturns: returnsSnap.size,
        availableEquipment: availableCount,
        rentedEquipment: rentedCount
      });

      setRents(rentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setReturns(returnsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setBeneficiaries(beneficiariesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setEquipment(equipmentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  }

  function exportToCSV(data, filename) {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          let value = row[header];
          if (value && typeof value === 'object' && value.toDate) {
            value = format(value.toDate(), 'yyyy-MM-dd');
          }
          return `"${value}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Statistics</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Beneficiaries</p>
                <p className="text-4xl font-bold mt-2">{stats.totalBeneficiaries}</p>
              </div>
              <Users size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Equipment</p>
                <p className="text-4xl font-bold mt-2">{stats.totalEquipment}</p>
              </div>
              <Package size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Rentals</p>
                <p className="text-4xl font-bold mt-2">{stats.activeRents}</p>
              </div>
              <ShoppingCart size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Returns</p>
                <p className="text-4xl font-bold mt-2">{stats.totalReturns}</p>
              </div>
              <RotateCcw size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Available Equipment</p>
                <p className="text-4xl font-bold mt-2">{stats.availableEquipment}</p>
              </div>
              <Package size={48} className="opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Rented Equipment</p>
                <p className="text-4xl font-bold mt-2">{stats.rentedEquipment}</p>
              </div>
              <Package size={48} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Export Data to Excel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => exportToCSV(beneficiaries, 'all_beneficiaries')}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Download size={20} />
              <span>Export Beneficiaries</span>
            </button>
            <button
              onClick={() => exportToCSV(equipment, 'all_equipments')}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Download size={20} />
              <span>Export Equipments</span>
            </button>
            <button
              onClick={() => exportToCSV(rents, 'all_rents')}
              className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Download size={20} />
              <span>Export Rents</span>
            </button>
            <button
              onClick={() => exportToCSV(returns, 'all_returns')}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Download size={20} />
              <span>Export Returns</span>
            </button>
          </div>
        </div>

        {/* Active Rents Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Rentals</h2>
          {rents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No active rentals</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No.</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rent Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rents.map(rent => (
                    <tr key={rent.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{rent.beneficiaryName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{rent.equipmentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{rent.serialNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {rent.rentDate && format(rent.rentDate.toDate(), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          rent.conditionOnGiven === 'Ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {rent.conditionOnGiven}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
