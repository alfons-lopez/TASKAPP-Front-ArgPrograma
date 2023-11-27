// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DetalleTareaPage from '../pages/DetalleTareaPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/detalle/:taskId" element={ <DetalleTareaPage /> } />
    </Routes>
  )
}

export default AppRoutes