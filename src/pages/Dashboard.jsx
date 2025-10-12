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
    equipmentTypes: []
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

      // Group equipment by type
      const equipmentTypes = {};
      equipmentList.forEach(equipment => {
        const type = equipment.type || equipment.name || 'Other';
        if (!equipmentTypes[type]) {
          equipmentTypes[type] = {
            type: type,
            items: [],
            totalCount: 0,
            availableCount: 0,
            rentedCount: 0
          };
        }
        equipmentTypes[type].items.push(equipment);
        equipmentTypes[type].totalCount++;
        if (equipment.status === 'Available') {
          equipmentTypes[type].availableCount++;
        } else {
          equipmentTypes[type].rentedCount++;
        }
      });

      setStats({
        equipmentTypes: Object.values(equipmentTypes)
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

        {/* Equipment Types */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Equipment Types We Provide</h2>
          {stats.equipmentTypes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No equipment types available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.equipmentTypes.map((equipmentType, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Package className="text-blue-600" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{equipmentType.type}</h3>
                        <p className="text-sm text-gray-500">Total: {equipmentType.totalCount} units</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-semibold mb-1">Available</p>
                      <p className="text-2xl font-bold text-green-700">{equipmentType.availableCount}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-red-600 font-semibold mb-1">Rented</p>
                      <p className="text-2xl font-bold text-red-700">{equipmentType.rentedCount}</p>
                    </div>
                  </div>

                  {/* Equipment Items */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase">Items:</p>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {equipmentType.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">SN: {item.serialNumber}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
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
