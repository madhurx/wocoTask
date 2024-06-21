import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);
    console.log( "private",user, loading)

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
