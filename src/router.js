import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Top } from './pages/top/';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' component={Top}/>
      </Router>
    </div>
  );
}

export { AppRouter };
