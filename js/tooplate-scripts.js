const width_threshold = 480;










function numberToKorean(number){
    const units = ['','만','억','조','경','해','자','양','구','간','정','재','극'];
    const splitUnit = 10000;
    let result = [];
    let unitCount = 0;
    
    let isNegative = number < 0;
    number = Math.abs(number);
    
    while(number > 0){
        let remainder = number % splitUnit;
        if(remainder > 0){
            result.unshift((unitCount > 0 ? remainder : '') + units[unitCount]);
        }
        number = Math.floor(number / splitUnit);
        unitCount++;
    }

    return (isNegative ? '-' : '') + result.join(' ');
}

function convertAndDisplay() {
    const numberInput = document.getElementById('numberInput').value;
    const resultElement = document.getElementById('result');
    
    const converted = numberToKorean(numberInput);
    
    if (numberInput < 0) {
        resultElement.innerHTML = `<span class="negative">${converted}</span>`;
    } else {
        resultElement.innerHTML = `<span class="positive">${converted}</span>`;
    }
}

let myLineChart; 
let myBarChart;
let myPieChart;

function drawLineChart(data) {
    const ctxLine = document.getElementById("lineChart").getContext("2d");

    if (myLineChart) {
        myLineChart.data = data;
        myLineChart.update();
    } else {
        const optionsLine = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Hits"
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return numberToKorean(value);
                        }
                    }
                }]
            }
        };

        myLineChart = new Chart(ctxLine, {
            type: 'line',
            data: data,
            options: optionsLine
        });
    }
}

function drawBarChart(labels, datasets) {
    const ctxBar = document.getElementById("barChart").getContext("2d");

    if (myBarChart) {
        myBarChart.data.labels = labels;
        myBarChart.data.datasets = datasets;
        myBarChart.update();
    } else {
        const optionsBar = {
            responsive: true,
            scales: {
                yAxes: [{
                    barPercentage: 0.2,
                    ticks: {
                        callback: function(value, index, values) {
                            return numberToKorean(value);
                        }
                    },
                    scaleLabel: {
                        display: false,
                        labelString: "Performance"
                    }
                }]
            }
        };

        myBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: optionsBar,
        });
    }
}

function drawPieChart(itemGroup) {
    // Validation check for itemGroup array
    if (!Array.isArray(itemGroup)) {
        console.error('Invalid itemGroup:', itemGroup);
        return;
    }

    var chartHeight = 300;
    $("#pieChartContainer").css("height", chartHeight + "px");

    const ctxPie = document.getElementById("pieChart").getContext("2d");
    let labels = itemGroup.map(item => item.itemName);
    let data = itemGroup.map(item => item.proportion);

    if (myPieChart) {
        myPieChart.data.labels = labels;
        myPieChart.data.datasets[0].data = data;
        myPieChart.update();
    } else {
        myPieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    }
                },
                legend: {
                    position: "top"
                }
            }
        });
    }
}



// function drawPieChart() {
//   if ($("#pieChart").length) {
//     var chartHeight = 300;

//     $("#pieChartContainer").css("height", chartHeight + "px");

//     ctxPie = document.getElementById("pieChart").getContext("2d");

//     optionsPie = {
//       responsive: true,
//       maintainAspectRatio: false,
//       layout: {
//         padding: {
//           left: 10,
//           right: 10,
//           top: 10,
//           bottom: 10
//         }
//       },
//       legend: {
//         position: "top"
//       }
//     };

//     configPie = {
//       type: "pie",
//       data: {
//         datasets: [
//           {
//             data: [18.24, 6.5, 9.15],
//             backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582"],
//             label: "Storage"
//           }
//         ],
//         labels: [
//           "Used Storage (18.240GB)",
//           "System Storage (6.500GB)",
//           "Available Storage (9.150GB)"
//         ]
//       },
//       options: optionsPie
//     };

//     pieChart = new Chart(ctxPie, configPie);
//   }
// }

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}

