import React from 'react';
import {Header} from './components/common';
import {ProductsPage} from './components/market';
import './App.css';

const App = () => (
  <div>
    <Header />
    <div className="main-area">
      <ProductsPage />
    </div>
  </div>
);

export default App;
