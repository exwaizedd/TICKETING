import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Dash = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Dash;
