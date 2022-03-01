import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.sass';
import Dropdown from './Components/Dropdown';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='app-content'>
        <Sidebar />
        <Outlet />
      </div>
      
    </div>
  );
}

export default App;
