import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TransactionChart = ({ transactions }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (transactions.length > 0 && chartContainer.current) {
      const gasUsedData = transactions.map((tx) => tx.gasUsed);
      const blockNumbers = transactions.map((tx) => tx.blockNumber);

      new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: blockNumbers,
          datasets: [
            {
              label: 'Gas Used',
              data: gasUsedData,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Block Numbers',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Gas Used',
              },
            },
          },
        },
      });
    }
  }, [transactions]);

  return <canvas ref={chartContainer} />;
};

export default TransactionChart;
