import React, { Component } from 'react';
import './App.css';

import FormOrder from './order/FormOrder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Restaurants</h1>
        </header>
        <FormOrder />
      </div>
    );
  }
}

export default App;
