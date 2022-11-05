import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import AddUSDX from './pages/AddUSDX';
import Studio from './pages/Studio';
import StudioLive from './pages/StudioLive';
import Upload from './pages/Upload';
import View from './pages/View';
import Creator from './pages/Creator';
import Subscribe from './pages/Subscribe';
import Navbar from './components/Navbar'

// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='w-screen h-screen outer'>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addusdx' element={<AddUSDX/>}/>
      <Route path='/studio/:add' element={<Studio/>}/>
      <Route path='/studio/golive/:add' element={<StudioLive/>}/>
      <Route path='/studio/upload/:add' element={<Upload/>}/>
      <Route path='/view/:linkcode' element={<View/>}/>
      <Route path='/creator/:id' element={<Creator/>}/>
      <Route path='/subscribe/:id' element={<Subscribe/>}/>
      {/* <Route path='/studio/:add/:viewcode' element={<Upload/>}/> */}
    </Routes>
    </div>
  </BrowserRouter>
);
