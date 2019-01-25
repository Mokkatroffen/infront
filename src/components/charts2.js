import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import statoilStock from "../data/Oslo_STL.json";
import stockholmStock from "../data/Stockholm_ABB";
import { Grid, Header, Statistic } from "semantic-ui-react";

export default class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      chartdata: "",
      statoilData: "",
      lastchanse: "",
      topbarLinks: ""
    };
  }

  morraDi() {
    const { lastchanse } = this.state;

    let lastchanse2 = statoilStock.map(key => {
      return (
        <h1>
          {console.log(key)}
          test
        </h1>
      );
    });
    this.setState({ lastchanse: lastchanse2 });
    this.setState({ validEmail: true });

    //or just this.setState({ topbarLinks });
  }
  sostraDi() {
    return (
      <Line
        data={{
          labels: statoilStock.map(item => item.date),
          datasets: [
            {
              data: statoilStock.map(item => item.last),
              label: "Oslo børs",
              backgroundColor: "",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            },
            {
              data: stockholmStock.map(item => item.last),
              label: "Svenskene",
              backgroundColor: "",
              borderColor: "rgba(255, 1, 30, 0.64)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            }
          ]
        }}
        options={{
          maintainAspectRatio: true,
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          backgroundColor: "rgba(255, 99, 132, 0.2)"
        }}
        backgroundColor="rgba(255, 99, 132, 0.2)"
      />
    );
  }

  render() {
    const { chartdata, lastchanse } = this.state;
    return <div>{this.sostraDi()}</div>;
  }
}
