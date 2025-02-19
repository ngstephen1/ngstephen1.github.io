import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const MyLanguagesChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Data for your horizontal bar chart
    const labels = ['Python', 'SQL', 'MATLAB', 'Java', 'JavaScript', 'HTML', 'CSS'];
    const usageData = [55.8, 10.0, 12.1, 14.5, 3.3, 2.1, 2.2]; // must total ~100

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Usage (%)',
            data: usageData,
            backgroundColor: [
              '#FFD700', // Python
              '#3498db', // SQL
              '#a24857', // MATLAB
              '#e67e22', // Java
              '#8a00c2', // JavaScript
              '#e74c3c', // HTML
              '#2ecc71'  // CSS
            ]
          }
        ]
      },
      options: {
        indexAxis: 'y', // horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
              // Append '%' to the x-axis labels
              callback: (value) => `${value}%`
            },
            grid: {
              color: '#555'
            }
          },
          y: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: '#555'
            }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Most Used Languages',
            color: '#ffffff',
            font: { size: 16 }
          }
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  // Style container so the chart has a dark background & correct sizing
  return (
    <div className="w-full h-[17rem] rounded-t-lg bg-[#1e1e1e] p-4">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MyLanguagesChart;
