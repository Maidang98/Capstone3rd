import React, { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { renderRoutes } from './routes';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {renderRoutes()}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
