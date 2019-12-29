import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

import WrapperPage from './pages/WrapperPage';
import StaticBarChartPage from './pages/StaticBarChartPage';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={WrapperPage} />
          <Route exact path="/static-bar" component={StaticBarChartPage} />
        </Switch>
    </Router>
  );
}

export default App;
