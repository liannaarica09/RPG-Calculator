import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/create" component={CreateChar} />
          <Route exact path="/play" component={PlayScreen} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;