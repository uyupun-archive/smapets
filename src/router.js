import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Top } from './pages/top/';
import { Setting } from './pages/setting/';
import { Navbar } from './components/navbar/'

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' component={Top}/>
        <Route path='/setting' component={Setting}/>
        <Navbar />
      </Router>
    </div>
  );
}

export { AppRouter };
