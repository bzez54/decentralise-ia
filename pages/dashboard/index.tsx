import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '../../lib/supabaseClient';

const Dashboard = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setEmail(data.user.email || '');
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Bienvenue sur ton espace personnel</h1>
      {email && <p className="mb-4">Connecté en tant que {email}</p>}
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/entrainement" className="text-blue-500 underline">
            Mon plan d'entraînement
          </Link>
        </li>
        <li>
          <Link href="/dashboard/courses" className="text-blue-500 underline">
            Courses à venir
          </Link>
        </li>
        <li>
          <Link href="/dashboard/stats" className="text-blue-500 underline">
            Statistiques
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
