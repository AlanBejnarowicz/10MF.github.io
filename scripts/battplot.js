

// 1) Set some Chart.js defaults for bigger text and custom font
Chart.defaults.font.size = 20; // Affects all text
Chart.defaults.font.family = '"VT323", sans-serif';

// 2) Intersection Observer: watch the section (with id="plot")
const plotSectionBatt = document.getElementById('plotbatt');
const observerbatt = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 3) When the plot section enters the viewport, create the chart
      createBattChart();
      // Stop observing so the chart isn't recreated repeatedly
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Start observing the plot section
observerbatt.observe(plotSectionBatt);

// 4) Define chart creation in a function
function createBattChart() {
  // Path (or URL) to your CSV file
  const csvUrl = 'assets/csv/bat_data.csv';

  // Get the 2D context of the canvas where we want to render the chart
  const ctx = document.getElementById('BattChart').getContext('2d');

  // Fetch and parse the CSV data
  fetch(csvUrl)
    .then(response => response.text())
    .then(csvData => {
      // Split CSV by newline to get rows
      const rows = csvData.trim().split('\n');

      // Arrays (using {x, y} objects for Chart.js "linear" x-axis)
      const voltageData = [];

      // The first row is the header: time,voltage
      // We'll skip that by starting from row index 1
      for (let i = 1; i < rows.length; i++) {
        const [timeStr, voltageStr] = rows[i].split(',');
        const timeVal = parseFloat(timeStr) 
        const voltageVal = parseFloat(voltageStr);

        // Only push if we have valid data
        if (!isNaN(timeVal) && !isNaN(voltageVal)) {
          voltageData.push({ x: timeVal, y: voltageVal });
        }
      }

      // Create the Chart
      new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Battery Voltage [V]',
              data: voltageData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'yVoltage',
              tension: 0.1,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          animation: {
            duration: 1500, // Adjust as desired (in ms)
            easing: 'easeOutQuart'
          },
          scales: {
            // x-axis: numeric (time in minutes)
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Time (minutes)'
              },
              ticks: {
                // Show whole minutes
                callback: function(value) {
                  return value + ' min';
                }
              },
              grid: {
                display: true,
                color: 'rgba(200, 200, 200, 0.2)',
                lineWidth: 1,
                drawBorder: false,
                tickLength: 5
              }
            },
            // Left axis: Voltage
            yVoltage: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Voltage [V]'
              },
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(200, 200, 200, 0.2)',
                lineWidth: 1,
                drawBorder: false,
                tickLength: 5
              }
            }
          },
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error loading or parsing CSV:', error);
    });
}
