import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/global.css';
import reportWebVitals from './reportWebVitals';
import Main from './pages/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoutes, { useVerify } from './components/Authentication';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Landplots from './pages/Landplot';
import Buildings from './pages/Buildings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <Header />
      <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route path="/Logout" element={<Logout />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Users" element={<Users />}/>
            <Route path="/Landplots" element={<Landplots />}/>
            <Route path="/Buildings" element={<Buildings />}/>
          </Route>
          <Route path="/" element={<Main />} />

      </Routes>
      {/*}<Footer />{*/}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
