import React from 'react';

import './App.css';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';

const App = () => {
  return (
    <Layout>
      <Home/>
    </Layout>
  );
};

export default App;
