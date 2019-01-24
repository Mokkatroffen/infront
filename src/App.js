import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <canvas id="STL" width="900" height="450" />
        <canvas id="ABB" width="900" height="450" />
      </div>
    );
  }
}

export default App;
