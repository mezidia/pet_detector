import loadChart from '../chart.js';
import Client from '../modules/client.js';

const display = () => {
  setTimeout(() => {
    const client = new Client();
    client.getData('getForChart').then(data => {
      loadChart(data);
    });
  }, 500);
  return `<div class="container" style="max-width: 550px;"><form action="/" method="POST">
  <div class="graphic-wraper">
  <canvas id="chart"></canvas>
  </div>
    </div>`
}

export default display;