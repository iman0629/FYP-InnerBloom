import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Redirects already-logged-in users away from signin/signup to /chat
const PublicOnlyRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/chat" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
