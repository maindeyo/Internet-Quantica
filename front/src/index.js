import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Navigation from './components/Navigation';
import CustomCarousel from './components/CustomCarousel';
import PhysicSection from './components/PhysicSection';
import Computers from './components/Computers';
import QuantumInternet from './components/QuantumInternet';
import QuantumCripto from './components/QuantumCripto';
import Comentarios from './components/Comments';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
    <CustomCarousel />
    <PhysicSection />
    <Computers />
    <QuantumInternet />
    <QuantumCripto />
    <Comentarios /> 
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
