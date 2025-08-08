import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
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

const Dashboard = () => {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
      else setSession(data.session);
    });
  }, [router]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Temps (min)',
        data: [50, 48, 47, 46, 45],
        borderColor: 'rgb(59,130,246)',
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Bienvenue sur ton espace personnel</h1>
      {session && <p className="mb-4">Connecté en tant que {session.user.email}</p>}
      <div className="max-w-xl">
        <Line data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
