import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = (props) => {
  return props.address ? <Outlet /> : <Navigate to='/' />;
};

export default RequireAuth;
