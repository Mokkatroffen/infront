import React from "react";
import statoilStock from "../data/Oslo_STL.json";

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      test: ""
    };
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.setAttribute("type", "text/js");
    script.src = "./charts.js";
    script.async = true;

    document.body.appendChild(script);

    this.setState({ test: statoilStock });
  }
  render() {
    var test = statoilStock;

    let datablog = JSON.stringify(this.state.test);
    return (
      <p>
        JSON dataen er
        <br />: {datablog}{" "}
      </p>
    );
  }
}
export default Test;
