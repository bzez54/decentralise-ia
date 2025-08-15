import { GetServerSideProps, NextPage } from 'next';
import { createClient } from '@supabase/supabase-js';

interface Performer {
  name: string;
  time: string;
}

interface Props {
  performers: Performer[];
}

const Home: NextPage<Props> = ({ performers }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Top 3 Performances</h1>
      <ul>
        {performers.map((p, i) => (
          <li key={p.name} className="mb-2">{i + 1}. {p.name} - {p.time}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  const { data } = await supabase
    .from('performances')
    .select('name,time')
    .order('time', { ascending: true })
    .limit(3);

  return {
    props: {
      performers: data || [],
    },
  };
};

export default Home;
