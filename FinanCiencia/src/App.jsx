import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import AdministrationPage from './pages/AdministrationPage/AdministrationPage.jsx';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
   <AuthProvider>
      <Router>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          {/* --- Fim das Rotas Públicas --- */}

          {/* --- Rotas Privadas --- */}
          <Route path="/AdministrationPage" element={<AdministrationPage/>} />
          {/* --- Fim das Rotas Privadas --- */}
        </Routes>
      </Router>
   </AuthProvider>
  );
}

export default App
