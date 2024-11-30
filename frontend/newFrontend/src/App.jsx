import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <main>
          <Outlet /> {/* This will render nested routes */}
        </main>
      </div>
    </div>
  );
}

export default App;
