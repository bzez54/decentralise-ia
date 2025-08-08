import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Navbar: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link href="/" className="font-bold">Club Running</Link>
      </div>
      <div className="space-x-4">
        {!session && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Inscription</Link>
          </>
        )}
        {session && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
