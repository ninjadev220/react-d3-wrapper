import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

import WrapperPage from './pages/WrapperPage';
import StaticBarChartPage from './pages/StaticBarChartPage';
import ScatterGraphPage from './pages/ScatterGraphPage';
import ColumnRangePage from './pages/ColumnRangePage';
import FileInputPage from './pages/FileInputPage';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={WrapperPage} />
          <Route exact path="/updating-bar" component={StaticBarChartPage} />
          <Route exact path="/scatter-graph" component={ScatterGraphPage} />
          <Route exact path="/column-range" component={ColumnRangePage} />
          <Route exact path="/file-input" component={FileInputPage} />
        </Switch>
    </Router>
  );
}

export default App;
