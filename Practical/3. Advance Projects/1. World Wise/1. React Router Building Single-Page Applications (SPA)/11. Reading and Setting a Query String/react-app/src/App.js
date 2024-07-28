import React from 'react';
import { useCities } from './hooks/useCities';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';

import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';


const App = () => 
{
  const { cities, isLoading, error } = useCities();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element= {<CityList cities={cities} isLoading={isLoading} error={error} />} />
          <Route path="cities" element= {<CityList cities={cities} isLoading={isLoading} error={error} />} />
          <Route path="cities/:cityId" element={<City/>} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} error={error} />} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
