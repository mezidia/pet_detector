'use strict';

export default function loadChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  ctx.width = window.width;
  ctx.height = window.height;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Загублені', 'Знайдені'], //
      datasets: [{
        label: 'Загублені та знайдені улюбленці наразі',
        fill: false,
        data: [data.lost, data.found], //
        backgroundColor: 'rgba(127, 255, 212, 1)',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1
      }]
    },
  });
}
