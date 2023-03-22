import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const RequireAdminAuth = (props) => {
  const adminAccess = import.meta.env.VITE_ACCESS_VALUE;

  return props.address === undefined ? (
    <Navigate to='/' />
  ) : props.address.toString() === adminAccess ? (
    <Outlet />
  ) : (
    <Navigate to='/dashboard' />
  );
};

export default RequireAdminAuth;
