import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

// initialize AOS once on app start
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 120,
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
