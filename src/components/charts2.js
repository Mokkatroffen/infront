import React from "react";
import { Line } from "react-chartjs-2";
import statoilStock from "../data/Oslo_STL.json";
import stockholmStock from "../data/Stockholm_ABB";

export default class Dashboard extends React.PureComponent {
  math() {
    let math = statoilStock.map(item => item.last); //Mapper json data til array av math
    let dates = statoilStock.map(item => item.date);
    const mathlength = math.length; //setter lengden av matharrayet til en variabel
    let sma = []; //Start av array deklareringer
    let avgDiff = [];
    let avgDiffSecond = [];
    let avgsecond = [];
    let bollingerPluss = [];
    let bollingerMinus = []; //Slutt på dekalerering av arrayer
    let z = 0; // Startverdi for itterering av de 20 første verdiene av bolinger
    while (z < 20) {
      //Løkke for å legge til 0 som bollinger og sma for de 20 første punktene ettersom vi ikke har 20 dager før disse.
      bollingerMinus[z] = 0;
      bollingerPluss[z] = 0;
      sma[z] = 0;
      z++;
    }
    for (var i = 19; i < mathlength; i++) {
      // Ittererer så mange punkter det er i arrayet til statoilStock
      //Setter SMA til de første 20 dagene til 0.
      var last20 = math.slice(i - 20, i); //Fører inn de 20 siste tidligere verdiene av arrayet inn i en egen last20 array
      var sum = last20.reduce((a, b) => a + b, 0); //Summerer verdien av de 20 siste dagenes verdi
      var avg = sum / 20; //Regner gjennomsnittet av de 20 siste dagene
      sma[i] = avg.toFixed(1); // Setter verdien av gjennomsnittet til et punkt i SMA
      var y = 0; //Kilde til basis for utregning av Bollinger: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
      while (y < 20) {
        avgDiff[y] = last20[y] - sma[i]; //Ittererer igjennom last20, trekker fra SMA verdien og finner da gjennomsnittlig differanse
        avgDiffSecond[y] = avgDiff[y] * avgDiff[y]; //Ganger avgDiff med seg selv for å finne opphøyd i andre
        y++;
      }
      var sumsecond = avgDiffSecond.reduce((a, b) => a + b, 0); //Setter til slutt summen av avgDiff i andre til en variabel sumsecond
      avgsecond[i] = sumsecond / 20; //Deler verdien på 20 for å få gjennomsnittet.
      bollingerPluss[i] = +parseFloat(math[i] + avgsecond[i]).toFixed(1); //Regner ut høyeste bollinger ved å plusse gjennomsnittligdiff pluss faktisk verdi og implicit parser med 1 decimal (samme som orginal data)
      bollingerMinus[i] = +parseFloat(math[i] - avgsecond[i]).toFixed(1); //Samme som pluss bare minus
    }
    var newBollingerMinus = bollingerMinus.reduce((acc2, curr) => {
      const item = { date: dates[i], last: curr };
      acc2.push(item);
      return acc2;
    }, []);
    var newBollingerPluss = bollingerPluss.reduce((acc3, curr) => {
      const item = { date: dates[i], last: curr };
      acc3.push(item);
      return acc3;
    }, []);
    var newsma = sma.reduce((acc, curr) => {
      const item = { date: dates[i], last: curr };
      acc.push(item);
      return acc;
    }, []);
    //console.log(avgsecond);
    return [newsma, newBollingerMinus, newBollingerPluss];
  }

  renderChart() {
    const math = this.math();
    const newsma = math[0];
    const newBollingerPluss = math[2];
    const newBollingerMinus = math[1];
    // console.log("newBollingerMinus er:", newBollingerMinus);
    // console.log("Statoilstock er:", statoilStock);
    // console.log("Svenskene er:", stockholmStock);
    // console.log("Statoil SMA er:", newsma);
    return (
      <Line
        data={{
          labels: statoilStock.map(item => item.date),
          datasets: [
            {
              data: statoilStock.map(item => item.last),
              label: "Oslo børs",
              backgroundColor: "",
              borderColor: "rgba(0,51,102)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 1, 30, 0.64)",
              hoverBorderColor: "rgba(0,51,102)"
            },
            {
              data: stockholmStock.map(item => item.last),
              label: "Svenskene",
              backgroundColor: "",
              borderColor: "rgba(0,0,0)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            },
            {
              data: newsma.map(item => item.last),
              label: "Statoil SMA",
              backgroundColor: "",
              borderColor: "rgba(255, 1, 30, 0.64)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            },
            {
              data: newBollingerMinus.map(item => item.last),
              label: "Statoil Bollinger minus",
              backgroundColor: "",
              borderColor: "rgba(193,0,0)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)"
            },
            {
              data: newBollingerPluss.map(item => item.last),
              label: "Statoil Bollinger pluss",
              backgroundColor: "",
              borderColor: "rgba(51,102,0)",
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
    return <div>{this.renderChart()}</div>;
  }
}
