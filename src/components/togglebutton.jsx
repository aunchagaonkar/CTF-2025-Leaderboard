import React from 'react';
import { useNavigate } from 'react-router-dom';
import './togglebutton.css';

const ToggleButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="ctn top-right-button">
      <button onClick={handleClick} className="button b-pink">
        Register
      </button>
    </div>
  );
};

export default ToggleButton;