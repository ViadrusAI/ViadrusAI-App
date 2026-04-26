import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LeakChartProps {
  sources: any[];
}

function zscore(points: { date: string; value: number | null }[]) {
  const valid = points
    .filter((p) => p.value != null && Number.isFinite(p.value as number) && p.value !== -999)
    .map((p) => p.value as number);
  if (valid.length < 2)
    return points.map((p) => ({ date: p.date, value: null }));
  const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
  const variance =
    valid.reduce((s, v) => s + (v - mean) ** 2, 0) / valid.length;
  const std = Math.sqrt(variance);
  if (std === 0) return points.map((p) => ({ date: p.date, value: 0 }));
  return points.map((p) => ({
    date: p.date,
    value: (p.value == null || p.value === -999) ? null : ((p.value as number) - mean) / std,
  }));
}

const COLORS = ['#a78bfa', '#ef4444', '#f97316', '#22c55e', '#06b6d4'];

const LeakChart: React.FC<LeakChartProps> = ({ sources }) => {
  const allDates = new Set<string>();
  const datasets = sources
    .filter((s) => s.status === 'ok')
    .map((src, idx) => {
      const layer = src.layers[0]; // Take first layer for simplicity
      if (!layer?.points) return null;

      const z = zscore(layer.points);
      z.forEach((p) => allDates.add(p.date));

      return {
        label: `${src.source.name}`,
        data: z.map((p) => ({ x: p.date, y: p.value })),
        borderColor: COLORS[idx % COLORS.length],
        backgroundColor: COLORS[idx % COLORS.length],
        tension: 0.3,
      };
    })
    .filter(Boolean);

  const labels = Array.from(allDates).sort();

  const data = {
    labels,
    datasets: datasets as any[],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: { color: '#9ca3af', font: { size: 10 } },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', font: { size: 10 } },
        grid: { color: 'rgba(75, 85, 99, 0.1)' },
      },
      y: {
        title: { display: true, text: 'z-score (σ)', color: '#9ca3af' },
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.1)' },
      },
    },
  };

  return (
    <div style={{ height: '240px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LeakChart;
