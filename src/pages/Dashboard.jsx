import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Users, Package, ShoppingCart, RotateCcw, FileText, UserCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-600 font-semibold">Total Beneficiaries</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">-</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-600 font-semibold">Total Equipment</p>
              <p className="text-3xl font-bold text-green-700 mt-2">-</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-600 font-semibold">Active Rentals</p>
              <p className="text-3xl font-bold text-orange-700 mt-2">-</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
