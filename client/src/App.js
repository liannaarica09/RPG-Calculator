import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import CreateChar from "../src/pages/CreateChar";
import PlayScreen from "../src/pages/PlayScreen";
import NoMatch from "../src/pages/NoMatch";
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