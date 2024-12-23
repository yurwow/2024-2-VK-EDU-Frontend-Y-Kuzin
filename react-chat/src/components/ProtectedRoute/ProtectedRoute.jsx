import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'))?.access;

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
