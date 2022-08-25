import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { PostProvider } from './context/PostContext';

import Layout from './components/Layout';
import Vehicles from './components/vehicles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <Routes>
              <Route path='/' element={<Layout />}/>
              {/* <Route path='/veiculos' element={<Vehicles/>}/> */}
          </Routes>
          <Toaster />
      </PostProvider>
        
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
