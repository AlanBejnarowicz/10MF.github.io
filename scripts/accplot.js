// plot.js

// 1) Set some Chart.js defaults for bigger text and custom font
Chart.defaults.font.size = 20; // Affects all text
Chart.defaults.font.family = '"VT323", sans-serif';

// 2) Intersection Observer: watch the section (with id="plot")
const plotSectionacc = document.getElementById('plotacc');
const observeracc = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 3) When the plot section enters the viewport, create the chart
      createAccChart();
      // Stop observing so the chart isn't recreated repeatedly
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Start observing the plot section
observeracc.observe(plotSectionacc);

// 4) Define chart creation in a function
function createAccChart() {
  // Path (or URL) to your CSV file
  const csvUrl = 'assets/csv/acc_data.csv';

  // Get the 2D context of the canvas where we want to render the chart
  const ctx = document.getElementById('zAxisChart').getContext('2d');

  // Fetch and parse the CSV data
  fetch(csvUrl)
    .then(response => response.text())
    .then(csvData => {
      // Split CSV by newline to get rows
      const rows = csvData.trim().split('\n');

      // Arrays (using {x, y} objects for Chart.js "linear" x-axis)
      const velocityData = [];
      const accelerationData = [];

      // The first row is the header: time,accZ,velZ
      // We'll skip that by starting from row index 1
      for (let i = 1; i < rows.length; i++) {
        const [timeStr, accZStr, velZStr] = rows[i].split(',');
        const timeVal = parseFloat(timeStr);
        const accVal  = parseFloat(accZStr);
        const velVal  = parseFloat(velZStr);

        // Only push if we have valid data
        if (!isNaN(timeVal) && !isNaN(accVal) && !isNaN(velVal)) {
          velocityData.push({ x: timeVal, y: velVal });
          accelerationData.push({ x: timeVal, y: accVal });
        }
      }

      // Create the Chart
      new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Velocity [km/h]',
              data: velocityData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'yVel',
              tension: 0.2,
              fill: false
            },
            {
              label: 'Acceleration [g]',
              data: accelerationData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID: 'yAcc',
              tension: 0.2,
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
            // x-axis: numeric (time in ms)
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Time (ms)'
              },
              ticks: {
                // Show 1 decimal place + "ms"
                callback: function(value) {
                  return value.toFixed(1) + ' ms';
                }
              }
            },
            // Left axis: Velocity
            yVel: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Velocity [km/h]'
              },
              beginAtZero: true
            },
            // Right axis: Acceleration
            yAcc: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Acceleration [Z]'
              },
              beginAtZero: true,
              grid: {
                drawOnChartArea: false
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