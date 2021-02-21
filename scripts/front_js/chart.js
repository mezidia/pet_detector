'use strict';

export default function loadChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  const chartWrapper = document.getElementById('graphic-wraper');
  ctx.width = chartWrapper.width;
  ctx.height = chartWrapper.height;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['lost', 'found'],
      datasets: [{
        label: 'Мінімальна ціна гречки',
        fill: false,
        data: [data.lost.length, data.found.length],
        backgroundColor: 'rgba(127, 255, 212, 1)',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1
      }]
    },
  });
}
