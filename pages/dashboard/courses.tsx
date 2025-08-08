import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import courses from '../../data/courses.json';

interface Course {
  id: number;
  name: string;
  date: string;
}

const Courses = () => {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
    });
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Courses à venir</h1>
      <ul>
        {(courses as Course[]).map((c) => (
          <li key={c.id} className="mb-2">
            {c.name} - {c.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
