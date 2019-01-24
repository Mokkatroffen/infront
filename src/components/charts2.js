import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import statoilStock from "../data/Oslo_STL.json";
import { Grid, Header, Statistic } from "semantic-ui-react";

const statoilData = () => {
  const data = {
    labels: statoilStock.statoilData[0].date,
    datasets: statoilStock.statoilData[1].last
  };
  return <Bar data={data} />;
};

export default class Dashboard extends React.PureComponent {
  renderDashboardStatistics = () => {
    return statoilStock.statistics.map(item => {
      return (
        <Statistic key={item.id}>
          {console.log(statoilStock)}
          <Statistic.Value>{item.value}</Statistic.Value>
          <Statistic.Label>{item.id}</Statistic.Label>
        </Statistic>
      );
    });
  };

  render() {
    return (
      <div>
        <Header as="h2">Dashboard</Header>
        {}
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h4" dividing>
                Monthly users
              </Header>
              <statoilData />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h4" dividing>
                Statistics
              </Header>
              <Statistic.Group size="small">
                {this.renderDashboardStatistics()}
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
