import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Users, Package, CheckCircle, ShoppingCart, TrendingUp, LogIn, UserPlus, Heart } from 'lucide-react';
import gumbadImg from '../assets/gumbad.png';

export default function Welcome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    totalEquipment: 0,
    availableEquipment: 0,
    rentedEquipment: 0,
    totalBenefitsGiven: 0,
    equipmentTypes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicStats();
  }, []);

  async function fetchPublicStats() {
    try {
      console.log('Fetching statistics from Firebase...');
      
      // Fetch beneficiaries
      const beneficiariesSnap = await getDocs(collection(db, 'beneficiaries'));
      console.log('Beneficiaries count:', beneficiariesSnap.size);
      
      // Fetch equipment
      const equipmentSnap = await getDocs(collection(db, 'equipments'));
      console.log('Equipment count:', equipmentSnap.size);
      
      const equipmentData = equipmentSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Equipment data:', equipmentData);
      
      // Count available and rented equipment
      const availableCount = equipmentData.filter(e => e.status === 'Available').length;
      const rentedCount = equipmentData.filter(e => e.status === 'Rented').length;
      console.log('Available:', availableCount, 'Rented:', rentedCount);
      
      // Get unique equipment types
      const types = [...new Set(equipmentData.map(e => e.equipmentName).filter(name => name))];
      console.log('Equipment types:', types);
      
      // Fetch returns to count total benefits
      const returnsSnap = await getDocs(collection(db, 'returns'));
      const rentsSnap = await getDocs(collection(db, 'rents'));
      const totalBenefits = returnsSnap.size + rentsSnap.size;
      console.log('Total benefits:', totalBenefits, '(Returns:', returnsSnap.size, 'Rents:', rentsSnap.size, ')');

      setStats({
        totalBeneficiaries: beneficiariesSnap.size,
        totalEquipment: equipmentSnap.size,
        availableEquipment: availableCount,
        rentedEquipment: rentedCount,
        totalBenefitsGiven: totalBenefits,
        equipmentTypes: types
      });
      
      console.log('Statistics updated successfully');
    } catch (error) {
      console.error('Error fetching stats:', error);
      console.error('Error details:', error.message);
      // Set default values on error
      setStats({
        totalBeneficiaries: 0,
        totalEquipment: 0,
        availableEquipment: 0,
        rentedEquipment: 0,
        totalBenefitsGiven: 0,
        equipmentTypes: []
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full p-2">
                <Heart className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ASM</h1>
                <p className="text-sm text-gray-600">Amine Shariyat Mission</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                <LogIn size={20} />
                <span className="hidden sm:inline">Login</span>
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
              >
                <UserPlus size={20} />
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">ASM</span>
          </h1>
          <div className="flex justify-center mb-4">
            <img src={gumbadImg} alt="Gumbad" className="mx-auto block w-48 h-auto" onError={(e) => { console.error('Image load error:', e); }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Amine Shariyat Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Empowering communities through accessible medical equipment and compassionate care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register-beneficiary')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              Register as Beneficiary
            </button>
            <button
              onClick={() => {
                document.getElementById('stats-section').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 text-lg font-semibold rounded-xl shadow-xl border-2 border-blue-600 transition-all transform hover:scale-105"
            >
              View Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section id="stats-section" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600">Making a difference in our community</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Total Registered Beneficiaries */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Users size={48} className="opacity-80" />
                <TrendingUp size={32} className="opacity-60" />
              </div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Registered Beneficiaries</h3>
              <p className="text-5xl font-bold mb-2">{stats.totalBeneficiaries}</p>
              <p className="text-sm opacity-80">Total people registered</p>
            </div>

            {/* Total Equipment & Types */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Package size={48} className="opacity-80" />
                <TrendingUp size={32} className="opacity-60" />
              </div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Total Equipment</h3>
              <p className="text-5xl font-bold mb-2">{stats.totalEquipment}</p>
              <p className="text-sm opacity-80">{stats.equipmentTypes.length} different types available</p>
            </div>

            {/* Available for Rent */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle size={48} className="opacity-80" />
                <TrendingUp size={32} className="opacity-60" />
              </div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Available Equipment</h3>
              <p className="text-5xl font-bold mb-2">{stats.availableEquipment}</p>
              <p className="text-sm opacity-80">Ready to rent out</p>
            </div>

            {/* Currently Rented */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <ShoppingCart size={48} className="opacity-80" />
                <TrendingUp size={32} className="opacity-60" />
              </div>
              <h3 className="text-lg font-semibold mb-2 opacity-90">Currently Rented</h3>
              <p className="text-5xl font-bold mb-2">{stats.rentedEquipment}</p>
              <p className="text-sm opacity-80">Equipment in use</p>
            </div>
          </div>
        )}

        {/* Additional Stats Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-12 text-white text-center transform hover:scale-105 transition-all">
          <Heart size={64} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Total Benefits Provided</h3>
          <p className="text-6xl font-bold mb-4">{stats.totalBenefitsGiven}</p>
          <p className="text-xl opacity-90">Beneficiaries helped with medical equipment</p>
        </div>
      </section>

      {/* Equipment Types Section */}
      {stats.equipmentTypes.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Medical Equipment We Provide</h2>
            <p className="text-xl text-gray-600">Types of equipment available for rent</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {stats.equipmentTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white border-2 border-blue-500 rounded-2xl px-5 py-3 shadow-md"
              >
                <p className="text-blue-600 font-semibold text-base">{type}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Need Medical Equipment?</h2>
          <p className="text-xl mb-8 opacity-90">
            Register now to access our medical equipment rental services
          </p>
          <button
            onClick={() => navigate('/register-beneficiary')}
            className="px-12 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="text-red-400" size={24} />
            <p className="text-xl font-semibold">ASM - Amine Shariyat Mission</p>
          </div>
          <p className="text-gray-400">Serving the community with compassion and care</p>
          <p className="text-gray-500 mt-4">&copy; 2025 All rights reserved. Website developed by IAM_KNK. Contact us on imran00143@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
