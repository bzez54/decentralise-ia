import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '../../lib/supabaseClient';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Entry {
  date: string;
  perf: number;
}

const Stats = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase
        .from('entrainements')
        .select('date,perf')
        .order('date', { ascending: true });
      setEntries((data as Entry[]) || []);
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: entries.map((e) => e.date),
    datasets: [
      {
        label: 'Performance',
        data: entries.map((e) => e.perf),
        borderColor: 'rgb(16,185,129)',
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Historique des performances</h1>
      <div className="max-w-xl">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Stats;
