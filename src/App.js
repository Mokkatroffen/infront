import React, { Component } from "react";
import "./App.css";
import Test from "./components/handling";
import Chart from "./components/charts2";

class App extends Component {
  constructor() {
    super();
    this.state = { chartData: {} };
  }
  getChartData() {
    this.setState({
      chartData: ""
    });
  }
  //Old render:
  //<canvas id="STL" width="900" height="450" />
  //<canvas id="ABB" width="900" height="450" />

  render() {
    return (
      <div className="App">
        <Chart
          data={this.state.chartData}
          options={{ maintainAspectRatio: false }}
        />
        <Test />
      </div>
    );
  }
}

export default App;
