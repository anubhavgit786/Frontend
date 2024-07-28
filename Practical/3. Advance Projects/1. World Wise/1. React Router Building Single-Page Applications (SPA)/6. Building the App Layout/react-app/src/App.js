import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
