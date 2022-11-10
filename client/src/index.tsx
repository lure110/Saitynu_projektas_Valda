import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './pages/Main';
import Header from './components/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <Header />
      <Routes>
          <Route >

          </Route>
          <Route path="/" element={<Main />} />
      </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
