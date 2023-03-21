import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const RequireAdminAuth = (props) => {
  const adminAccess = process.env.ACCESS_VALUE;

  return props.address === undefined ? (
    <Navigate to='/' />
  ) : props.address.toString() === adminAccess ? (
    <Outlet />
  ) : (
    <Navigate to='/dashboard' />
  );
};

export default RequireAdminAuth;
