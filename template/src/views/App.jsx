import React from 'react';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <div id="app-header">
          Welcome to <a href="https://github.com/MiguelCastillo/bundler-reactor">bundler-reactor</a>
        </div>
        <div id="app-body">
          <h2>Hello, world!</h2>
          <p>If you have any feedback, I would love to hear it! - Please open an issue <a href="https://github.com/MiguelCastillo/bundler-reactor/issues">here</a></p>
        </div>
        <div id="app-footer">
          Miguel Castillo
        </div>
      </div>
    );
  }
}

export default App;
