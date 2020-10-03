import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Top } from './pages/top/';
import { Setting } from './pages/setting/';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' component={Top}/>
        <Route path='/setting' component={Setting}/>
      </Router>
    </div>
  );
}

export { AppRouter };
