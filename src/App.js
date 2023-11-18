import { pkg } from '@carbon/ibm-products';
import './App.css';
import './app.scss';
import React, { Component } from 'react';
import { Button, Content } from '@carbon/react';
import CarbonHeader from './components/header';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './content/dashboard/dashboard';
import Home from './content/home';
import Login from './content/login';
import EmpPage from './content/empPage';
import NewPageDash from './content/dashboard/newPage/newPageDash';
import '@carbon/ibm-products/css/index.min.css';

pkg.setAllComponents(true);
pkg.setAllFeatures(true);

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<div><Home /><CarbonHeader /></div>} />
        <Route exact path="/emppage" element={<div><EmpPage /><CarbonHeader /></div>} />
        <Route exact path="/dashboard" element={<div><Dashboard /><CarbonHeader /></div>} />
        <Route path="/dashnew" element={<div><NewPageDash/><CarbonHeader/></div>} />
      </Routes>
  );
}

export default App;
