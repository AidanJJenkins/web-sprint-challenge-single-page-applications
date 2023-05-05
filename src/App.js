import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import OrderForm from './components/OrderForm'

const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza" element={<OrderForm />} />
        </Routes>
  );
};
export default App;
