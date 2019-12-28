import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

import WrapperPage from './pages/WrapperPage';

function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={WrapperPage} />
        </Switch>
    </Router>
  );
}

export default App;
