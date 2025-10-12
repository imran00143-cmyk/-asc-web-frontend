import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Layout from '../components/Layout';
import { Users, Package, ShoppingCart, RotateCcw, FileText, UserCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    equipmentList: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const equipmentSnap = await getDocs(collection(db, 'equipments'));
      const equipmentList = equipmentSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStats({
        equipmentList: equipmentList
      });
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  }

  const menuItems = [
    {
      title: 'Beneficiary Detail',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/beneficiaries'
    },
    {
      title: 'Equipment Detail',
      icon: Package,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      path: '/equipment'
    },
    {
      title: 'Add Rent',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      path: '/rent'
    },
    {
      title: 'Return',
      icon: RotateCcw,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/return'
    },
    {
      title: 'Reports',
      icon: FileText,
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      path: '/reports'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-4">
              <UserCircle className="text-blue-600" size={48} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome, Admin</h1>
              <p className="text-blue-100 mt-1">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`${item.color} ${item.hoverColor} text-white rounded-xl shadow-lg p-8 transition-all transform hover:scale-105 hover:shadow-2xl`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Icon size={64} strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-center">{item.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Equipment List */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Equipment</h2>
          {stats.equipmentList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No equipment available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.equipmentList.map((equipment) => (
                <div key={equipment.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Package className="text-green-600" size={24} />
                      <h3 className="text-lg font-bold text-gray-800">{equipment.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      equipment.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {equipment.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Serial Number:</span>
                      <span className="font-semibold text-gray-800">{equipment.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-gray-800">{equipment.type || 'N/A'}</span>
                    </div>
                    {equipment.description && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-gray-600 text-xs">{equipment.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
