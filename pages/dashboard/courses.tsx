import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '../../lib/supabaseClient';

interface Course {
  id: number;
  name: string;
  date: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase
        .from('courses')
        .select('id,name,date')
        .order('date', { ascending: true });
      setCourses((data as Course[]) || []);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Courses à venir</h1>
      <ul>
        {courses.map((c) => (
          <li key={c.id} className="mb-2">
            {c.name} - {c.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
