import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Equipment Images
import OxygenConcentrator from '../assets/Equipment/OxygenConcentrator.png';
import OC from '../assets/Equipment/OC.png';
import WC from '../assets/Equipment/WC.png';
import Stick from '../assets/Equipment/Stick.png';
import bed from '../assets/Equipment/bed.png';

// Gumbad Images
import Gumbad from '../assets/Gumbad/Gumbad.png';

// Logo Images
import Logo from '../assets/Logos/4.png';
import L1 from '../assets/Logos/1.png';
import L2 from '../assets/Logos/2.png';
import L3 from '../assets/Logos/3.png';
import L5 from '../assets/Logos/5.png';
import L6 from '../assets/Logos/6.png';
import L7 from '../assets/Logos/7.png';
import L8 from '../assets/Logos/8.png';

// Gallery data structure organized by folders
const galleryData = [
  {
    name: 'Medical Equipment',
    images: [
      { src: OxygenConcentrator, title: 'Oxygen Concentrator' },
      { src: OC, title: 'Oxygen Cylinder' },
      { src: WC, title: 'Wheel Chair' },
      { src: Stick, title: 'Walking Stick' },
      { src: bed, title: 'Hospital Bed' },
    ],
  },
  {
    name: 'Organization',
    images: [
      { src: Gumbad, title: 'ASM Building' },
    ],
  },
  {
    name: 'Logos & Branding',
    images: [
      { src: L1, title: 'ASM Logo 1' },
      { src: L2, title: 'ASM Logo 2' },
      { src: L3, title: 'ASM Logo 3' },
      { src: Logo, title: 'ASM Logo 4' },
      { src: L5, title: 'ASM Logo 5' },
      { src: L6, title: 'ASM Logo 6' },
      { src: L7, title: 'ASM Logo 7' },
      { src: L8, title: 'ASM Logo 8' },

    ],
  },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState(galleryData[0].name);
  const currentFolder = galleryData.find(f => f.name === selectedFolder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-yellow to-green-200 py-8">
      {/* Go to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-100 flex items-center space-x-2 text-blue-800 hover:bg-blue-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-4x2 font-bold text-gray-600 mb-4 text-center font-sans">Gallery</h1>
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center font-sans"> Our Visual Diary </h1>
        {/* Folder/Category Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {galleryData.map(folder => (
            <button
              key={folder.name}
              onClick={() => setSelectedFolder(folder.name)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors shadow-md ${selectedFolder === folder.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
            >
              {folder.name}
            </button>
          ))}
        </div>
        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentFolder.images.map((img, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-x1 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-600 ">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
