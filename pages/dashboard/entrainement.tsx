import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const Entrainement = () => {
  const [plan, setPlan] = useState<string>('');

  useEffect(() => {
    const fetchPlan = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();
        setPlan(profile?.plan || 'Aucun plan disponible');
      }
    };
    fetchPlan();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Ton plan d'entraînement</h1>
      <pre className="whitespace-pre-wrap">{plan}</pre>
    </div>
  );
};

export default Entrainement;
