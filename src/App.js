// import { connect } from "react-redux";
// import { getUsers } from "./ducks/reducer";
import React, { Component } from 'react';

import routes from "./routes";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Navigation/>
          <br/>
        {routes}
      </div>
    );
  }
}

// const mapStateToProps = state => state;

export default App;
