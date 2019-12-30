import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

import WrapperPage from './pages/WrapperPage';
import StaticBarChartPage from './pages/StaticBarChartPage';
import ScatterGraphPage from './pages/ScatterGraphPage';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={WrapperPage} />
          <Route exact path="/updating-bar" component={StaticBarChartPage} />
          <Route exact path="/scatter-graph" component={ScatterGraphPage} />
        </Switch>
    </Router>
  );
}

export default App;
