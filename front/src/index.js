import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navigation from './components/Navigation';
import CustomCarousel from './components/CustomCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Computers from './components/Computers';
import InternetSection from './components/InternetSection';
import CriptoSection from './components/CriptoSection';
import InfoSession from './components/InfoSession';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
    <CustomCarousel />
    <Computers />
    {/* <InternetSection />
    <CriptoSection /> */}
    <InfoSession />
  </React.StrictMode>
);
reportWebVitals();
