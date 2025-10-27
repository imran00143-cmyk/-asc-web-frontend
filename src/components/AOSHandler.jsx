// src/components/AOSHandler.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

export default function AOSHandler() {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 120,
    });
  }, []);

  useEffect(() => {
    // Refresh AOS on every route change
    AOS.refresh();
  }, [location]);

  return null;
}
