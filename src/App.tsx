import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home.tsx';
import NotFound from '@pages/NotFound.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default App;
