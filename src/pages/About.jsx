import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from '../assets/Logos/ASM-W.png';
import Tropical from '../assets/Gumbad/Tropical.jpg';

export default function About() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${Tropical})` }}
    >
      {/* decorative blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-ping opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-200 rounded-full blur-2xl animate-ping opacity-20 pointer-events-none" />

      {/* Go to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white/30 px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 text-white hover:bg-black/40 backdrop-blur-md"
          aria-label="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="w-32 h-32 mx-auto mb-8"
            data-aos="zoom-in"
            data-aos-duration="900"
            data-aos-delay="150"
            data-aos-once="false"
          >
            <img src={Logo} alt="ASM Logo" className="w-full h-full object-contain" />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-once="false"
          >
            About <span className="text-blue-400">ASM</span>
          </h1>

          <p
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="false"
          >
            Amine Shariyat Mission — empowering communities by providing accessible medical
            equipment and healthcare support for those who need it most.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="container mx-auto px-4 py-12"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-offset="120"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white/10 rounded-xl shadow-lg p-8 transform transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
            data-aos="fade-up"
            data-aos-delay="250"
            data-aos-once="false"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white leading-relaxed">
              To provide accessible medical equipment to those in need, ensuring that financial
              constraints never prevent anyone from accessing essential healthcare resources. Through
              our free rental service, we aim to support our community's health and well-being.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 rounded-xl shadow-lg p-8 transform transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
            data-aos="fade-up"
            data-aos-delay="350"
            data-aos-once="false"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-white leading-relaxed">
              Creating a community where everyone has equal access to medical equipment and healthcare
              resources. We envision a future where no one has to compromise their health due to the
              unavailability or cost of medical equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-4 py-12" data-aos="zoom-in" data-aos-delay="250" data-aos-once="false">
        <h2 className="text-3xl font-bold text-white mb-8 text-center" data-aos="fade-up" data-aos-delay="200" data-aos-once="false">
          What We Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white/10 rounded-xl shadow-lg p-6 text-center"
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-once="false"
          >
            <h3 className="text-xl font-bold text-white mb-4">Free Equipment Rental</h3>
            <p className="text-white">
              We provide medical equipment free of charge to those who need it, making healthcare
              accessible to everyone.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 rounded-xl shadow-lg p-6 text-center"
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="false"
          >
            <h3 className="text-xl font-bold text-white mb-4">Equipment Maintenance</h3>
            <p className="text-white">
              Regular maintenance and sanitization of all equipment to ensure safety and reliability.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 rounded-xl shadow-lg p-6 text-center"
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="false"
          >
            <h3 className="text-xl font-bold text-white mb-4">Community Support</h3>
            <p className="text-white">
              Guidance and support for proper equipment usage and healthcare resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up" data-aos-delay="250" data-aos-once="false">
        <div
           className="bg-white/10 rounded-xl shadow-lg p-6 text-center"
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="false"          
        >
          <div className="relative z-10">
            <h2 className="text-3xl text-white font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-white mb-6">
              We're here to help our community. Reach out to us for any assistance.
            </p>
            <div className="space-y-2 text-white ">
              <p>Email 🌐 : imran00143@gmail.com</p>
              <p>Phone 🕾 : +91 810 954 0030</p>
              <p>Location ⟟ : Near Jama Masjid, Shitlapara, Kanker, Chhatisgarh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-12" data-aos="fade-up" data-aos-delay="300" data-aos-once="false">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div className="bg-white/10 rounded-xl shadow-lg p-6 text-center" whileHover={{ scale: 1.03 }} data-aos="zoom-in" data-aos-delay="350" data-aos-once="false">
            <h3 className="text-xl font-bold text-white mb-2">Compassion</h3>
            <p className="text-white">Serving with empathy and understanding</p>
          </motion.div>

          <motion.div className="bg-white/10 rounded-xl shadow-lg p-6 text-center" whileHover={{ scale: 1.03 }} data-aos="zoom-in" data-aos-delay="450" data-aos-once="false">
            <h3 className="text-xl font-bold text-white mb-2">Accessibility</h3>
            <p className="text-white">Making healthcare available to all</p>
          </motion.div>

          <motion.div className="bg-white/10 rounded-xl shadow-lg p-6 text-center" whileHover={{ scale: 1.03 }} data-aos="zoom-in" data-aos-delay="550" data-aos-once="false">
            <h3 className="text-xl font-bold text-white mb-2">Integrity</h3>
            <p className="text-white">Operating with transparency and trust</p>
          </motion.div>

          <motion.div className="bg-white/10 rounded-xl shadow-lg p-6 text-center" whileHover={{ scale: 1.03 }} data-aos="zoom-in" data-aos-delay="650" data-aos-once="false">
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-white">Building stronger, healthier communities</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
