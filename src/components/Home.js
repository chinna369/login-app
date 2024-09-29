import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
