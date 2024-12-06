import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navigation from './components/Navigation';
import CustomCarousel from './components/CustomCarousel';
import PhysicSection from './components/PhysicSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import Computers from './components/Computers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
    <CustomCarousel />
    <PhysicSection />
    <Computers />
    
  </React.StrictMode>
);
reportWebVitals();