import { NextPage } from 'next';

const performers = [
  { name: 'Alice', time: '32:10' },
  { name: 'Bob', time: '33:05' },
  { name: 'Charlie', time: '34:20' },
];

const Home: NextPage = () => {
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

export default Home;
