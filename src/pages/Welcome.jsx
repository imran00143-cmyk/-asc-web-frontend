import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Gumbad from '../assets/Gumbad/Gumbad.png';
import OxygenConcentrator from '../assets/Equipment/OxygenConcentrator.png';
import Logo from '../assets/Logos/ASM.png';
import OC from '../assets/Equipment/OC.png';
import WC from '../assets/Equipment/WC.png';
import Stick from '../assets/Equipment/Stick.png';
import bed from '../assets/Equipment/bed.png';

export default function Welcome() {
  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-yellow to-green-200">
      {/* Header */}
      <header className="bg-green-100 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={Logo} alt="ASM Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ASM</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/gallery')}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  About
                </button>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors shadow"

              >
                <LogIn size={20} />
                <span className="hidden sm:inline">Login</span>
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
            <img src={Gumbad} alt="Gumbad" className="mx-auto block h-80 h-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Amine Shariyat Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Empowering communities through accessible medical equipment and compassionate care
          </p>
          <p className="text-xl text-gray-600 mb-8">
            Here, We are providing free rental of medical equipment to those in need, ensuring everyone has access to essential healthcare resources.
          </p>
        </div>
      </section>

      {/* OxygenConcentrator Image and Details Box Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="md:w-1/4 overflow-hidden">
              <img 
                src={OxygenConcentrator} 
                alt="Medical Equipment" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Content Side */}
            <div className="md:w-3/4 p-8">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Oxygen Concentrator
              </h3>
              <h3 className="text-xl text-gray-700 mb-4">
                Oxygen Concentrator, 40 Lbs, Capacity: 3 L
              </h3>
              <div className="space-y-4">
                <p className="text-gray-800 text-justify leading-relaxed">
                  An oxygen concentrator is a medical device that provides a continuous supply of concentrated oxygen to patients with low blood oxygen levels. Unlike an oxygen cylinder, which stores a finite amount of compressed oxygen, a concentrator draws in ambient air, separates out the nitrogen, and delivers 90–95% pure oxygen to the user. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oxygen cylinder Image and Details Box Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row-reverse">
            {/* Image Side */}
            <div className="md:w-1/5 overflow-hidden">
              <img 
                src={OC} 
                alt="Medical Equipment" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Content Side */}
            <div className="md:w-3/4 p-8">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Oxygen cylinder
              </h3>
              <h3 className="text-xl text-gray-700 mb-4">
                Industrial Oxygen Cylinder , 10 Ltr
              </h3>
              <div className="space-y-4">
                <p className="text-gray-800 text-justify leading-relaxed">
                  The industrial-grade oxygen cylinder is designed for both medical and industrial applications, providing a reliable source of oxygen for various needs. Crafted from durable steel, this cylinder ensures safety and longevity in demanding environments. Its compact size makes it easy to transport and store, while still delivering ample oxygen supply. Ideal for healthcare facilities, laboratories, and manufacturing processes, this oxygen cylinder is essential for maintaining optimal performance. Trust in this robust solution for your oxygen needs, whether in a clinical setting or an industrial operation. Experience efficiency and reliability with this indispensable tool for your oxygen supply requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Wheelchair Image and Details Box Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="md:w-1/4 overflow-hidden">
              <img 
                src={WC} 
                alt="Medical Equipment" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Content Side */}
            <div className="md:w-3/4 p-8">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Wheel Chair
              </h3>
              <h3 className="text-xl text-gray-700 mb-4">
                Hospital Aluminium Wheel Chair,Size 22 Inch
              </h3>
              <div className="space-y-4">
                <p className="text-gray-800 text-justify leading-relaxed">
                  A hospital wheelchair is a specialized mobility device designed to safely and comfortably transport patients within healthcare facilities. It plays a vital role in patient care, offering support for individuals with limited mobility due to illness, injury, or surgery. Hospital wheelchairs are built with durability, ease of use, and patient comfort in mind. Most feature a sturdy steel or aluminum frame, padded seat and backrest, and large rear wheels for smooth movement. They often include swing-away or detachable armrests and elevating leg rests to accommodate various medical needs and improve accessibility during transfers. Many models are foldable, allowing for easy storage and transport, while others are designed for heavy-duty use in emergency rooms or operating theaters. Safety features such as wheel locks, anti-tip bars, and seat belts are standard to prevent accidents during movement. Some advanced hospital wheelchairs also offer reclining backs, tilt-in-space functions, or power-assisted mobility for patients requiring long-term or specialized care.

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Stick Image and Details Box Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row-reverse">
            {/* Image Side */}
            <div className="md:w-1/4 overflow-hidden">
              <img 
                src={Stick} 
                alt="Medical Equipment" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Content Side */}
            <div className="md:w-3/4 p-8">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Stick
              </h3>
              <h3 className="text-xl text-gray-700 mb-4">
                Everactiv 10 Level Height Adjustable Quadripod Walking Stick with Strengthened Chassis and Anti-Skid Feet | Perfect Support for Various Surface
              </h3>
              <div className="space-y-4">
                <p className="text-gray-800 text-justify leading-relaxed">
                  A medical stick—commonly known as a walking stick or cane—is a mobility aid designed to provide balance, support, and stability for individuals with limited mobility or strength. It comes in various types, each tailored to specific needs and physical conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Bed Image and Details Box Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="md:w-1/2 overflow-hidden">
              <img 
                src={bed} 
                alt="Medical Equipment" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Content Side */}
            <div className="md:w-3/4 p-8">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                Bed
              </h3>
              <h3 className="text-xl text-gray-700 mb-4">
                ICU Hospital Bed Mechanical 5 Function with Wheels ABS Panel and Railing and Mattress
              </h3>
              <div className="space-y-4">
                <p className="text-gray-800 text-justify leading-relaxed">
                  Features: 5 Mechanical Functions: Manual crank system to adjust height, backrest, leg rest, Trendelenburg & reverse Trendelenburg. ABS Panels & Side Railings: Easy to clean, detachable, and hygienic. Caster Wheels with Brakes: Ensures effortless mobility and secure positioning. Sturdy Frame Construction: Mild steel with epoxy coating for durability. Comfort Mattress Included: Promotes patient comfort for extended stays. IV Rod & Drainage Hooks Included: Complete for ICU needs.

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        
            <p className="text-xl font-semibold">ASM - Amine Shariyat Mission</p>
          </div>
          <p className="text-gray-400">Serving the community with compassion and care</p>
          <p className="text-gray-500 mt-4">&copy; 2025 All rights reserved.Web Developed by IAM_Knk. Contact Us: imran00143@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
