import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function WeatherChart({ data }) {
  const chartData = {
    labels: data.daily.time.map(date => 
      new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
    ),
    datasets: [
      {
        label: 'Max Temperature',
        data: data.daily.temperature_2m_max,
        borderColor: 'rgba(255, 183, 77, 0.8)',
        backgroundColor: 'rgba(255, 183, 77, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Min Temperature',
        data: data.daily.temperature_2m_min,
        borderColor: 'rgba(144, 202, 249, 0.8)',
        backgroundColor: 'rgba(144, 202, 249, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      }
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-glass-light/30 backdrop-blur-xl rounded-weather p-4 
                    shadow-2xl border border-white/10">
      <Line data={chartData} options={options} />
    </div>
  );
}
