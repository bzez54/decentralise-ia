import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const Entrainement = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', data.user.id)
        .single();
      setPlan(profile?.plan || 'Aucun plan disponible');
    });
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Ton plan d'entraînement</h1>
      <pre className="whitespace-pre-wrap">{plan}</pre>
    </div>
  );
};

export default Entrainement;
