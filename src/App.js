import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';

import LazyLoader from './components/LazyLoader';
const WrapperPage = React.lazy(() => import('./pages/WrapperPage'));
const StaticBarChartPage = React.lazy(() => import('./pages/StaticBarChartPage'));
const ScatterGraphPage = React.lazy(() => import('./pages/ScatterGraphPage'));
const ColumnRangePage = React.lazy(() => import('./pages/ColumnRangePage'));
const FileInputPage = React.lazy(() => import('./pages/FileInputPage'));

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={LazyLoader(WrapperPage)} />
          <Route exact path="/updating-bar" component={LazyLoader(StaticBarChartPage)} />
          <Route exact path="/scatter-graph" component={LazyLoader(ScatterGraphPage)} />
          <Route exact path="/column-range" component={LazyLoader(ColumnRangePage)} />
          <Route exact path="/file-input" component={LazyLoader(FileInputPage)} />
        </Switch>
    </Router>
  );
}

export default App;
