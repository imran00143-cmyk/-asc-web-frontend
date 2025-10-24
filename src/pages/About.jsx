import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logos/ASM.png';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-red to-green-200 relative overflow-hidden">
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse opacity-30"></div>
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200 rounded-full blur-2xl animate-ping opacity-20"></div>

      {/* Go to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-blue-600 hover:bg-blue-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8">
            <img src={Logo} alt="ASM Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">ASM</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Amine Shariyat Mission - Empowering Communities Through Healthcare Support
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible medical equipment to those in need, ensuring that financial constraints 
              never prevent anyone from accessing essential healthcare resources. Through our free rental 
              service, we aim to support our community's health and well-being.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Creating a community where everyone has equal access to medical equipment and healthcare 
              resources. We envision a future where no one has to compromise their health due to the 
              unavailability or cost of medical equipment.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Free Equipment Rental</h3>
            <p className="text-gray-600">
              We provide medical equipment free of charge to those who need it, making healthcare 
              accessible to everyone.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Equipment Maintenance</h3>
            <p className="text-gray-600">
              Regular maintenance and sanitization of all equipment to ensure safety and reliability.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Community Support</h3>
            <p className="text-gray-600">
              Guidance and support for proper equipment usage and healthcare resources.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12">
        <div 
          className="text-white rounded-xl shadow-xl p-8 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(rgba(139, 134, 229, 0.95), rgba(44, 17, 6, 0.95)), url('/bullseye-gradient.svg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-6">
              We're here to help our community. Reach out to us for any assistance.
            </p>
            <div className="space-y-2">
              <p>Email 🌐 : imran00143@gmail.com</p>
              <p>Phone 🕾 : +91 810 954 0030</p>
              <p>Location ⟟ :  Near Jama Masjid, Shitlapara, Kanker, Chhatisgarh </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Compassion</h3>
            <p className="text-gray-600">Serving with empathy and understanding</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Accessibility</h3>
            <p className="text-gray-600">Making healthcare available to all</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Integrity</h3>
            <p className="text-gray-600">Operating with transparency and trust</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Community</h3>
            <p className="text-gray-600">Building stronger, healthier communities</p>
          </div>
        </div>
      </section>
    </div>
  );
}