// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
import LoginPage from './Pages/Login/Login';
import ProtectedRoute from './Utils/ProtectedRoute';
import Header from './Pages/Header/Header';
import Footer from './Pages/Footer/Footer';
import SignupPage from './Pages/Signup/Signup';
// import HomePage from './HomePage';
// import ProtectedPage from './ProtectedPage';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/protected" element={<ProtectedRoute component={LoginPage} />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
