import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const headerStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: '1.2rem',
    padding: '1rem 2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Home bruh</h1>
      <Link to="/pizza">
        <button id="order-pizza" style={ buttonStyle}>Order some pizza</button>
      </Link>
    </div>
  );
}

export default Home;

