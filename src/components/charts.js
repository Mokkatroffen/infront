document.addEventListener("DOMContentLoaded", function(event) {
  getDataSet("../data/Oslo_STL.json", function(dataSet) {
    if (dataSet) {
      renderChart("STL", JSON.parse(dataSet));
    }
  });
  getDataSet("../data/Stockholm_ABB.json", function(dataSet) {
    if (dataSet) {
      renderChart("ABB", JSON.parse(dataSet));
    }
  });
});

function renderChart(id, dataSet) {
  var data = dataSet.map(function(item, index, array) {
    return {
      x: new Date(item.date).toISOString(),
      y: item.last
    };
  });
  var context = document.querySelector("#" + id).getContext("2d");
  var stockChart = new Chart(context, {
    type: "line",
    data: {
      datasets: [
        {
          label: id,
          fill: false,
          data: data,
          pointRadius: 0,
          borderColor: "#1a5ecc"
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        xAxes: [
          {
            type: "time",
            display: true
          }
        ]
      }
    }
  });
}

function getDataSet(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function() {
    if (xhr.status == 200) {
      callback(xhr.responseText);
    } else {
      callback(null);
    }
  };
  xhr.send();
}
