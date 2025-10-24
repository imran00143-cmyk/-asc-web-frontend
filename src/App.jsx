import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './pages/Welcome';
import PublicBeneficiaryForm from './pages/PublicBeneficiaryForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BeneficiaryList from './pages/BeneficiaryList';
import BeneficiaryForm from './pages/BeneficiaryForm';
import EquipmentList from './pages/EquipmentList';
import EquipmentForm from './pages/EquipmentForm';
import RentForm from './pages/RentForm';
import ReturnForm from './pages/ReturnForm';
import Reports from './pages/Reports';
import Gallery from './pages/Gallery';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register-beneficiary" element={<PublicBeneficiaryForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/beneficiaries" element={<PrivateRoute />}>
            <Route index element={<BeneficiaryList />} />
            <Route path="new" element={<BeneficiaryForm />} />
            <Route path="edit/:id" element={<BeneficiaryForm />} />
          </Route>
          <Route path="/equipment" element={<PrivateRoute />}>
            <Route index element={<EquipmentList />} />
            <Route path="new" element={<EquipmentForm />} />
            <Route path="edit/:id" element={<EquipmentForm />} />
          </Route>
          <Route path="/rent" element={<PrivateRoute />}>
            <Route index element={<RentForm />} />
          </Route>
          <Route path="/return" element={<PrivateRoute />}>
            <Route index element={<ReturnForm />} />
          </Route>
          <Route path="/reports" element={<PrivateRoute />}>
            <Route index element={<Reports />} />
          </Route>
          <Route path="/gallery" element={<Gallery />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
