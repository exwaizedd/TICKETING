import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const RequireAdminAuth = (props) => {
  const adminAccess = '0xb91131c2712e8AF7e19D0a617a01AE4a8573e9A1';

  return props.address === undefined ? (
    <Navigate to='/' />
  ) : props.address.toString() === adminAccess ? (
    <Outlet />
  ) : (
    <Navigate to='/dashboard' />
  );
};

export default RequireAdminAuth;
