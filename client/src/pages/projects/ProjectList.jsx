import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/project/projectSlice";

export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.project);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p._id} className="border p-2 rounded">
            <h3 className="font-semibold">{p.title} ({p.status})</h3>
            <p>Domain: {p.domain}</p>
            <p>Student: {p.student?.name}</p>
            <p>Faculty: {p.faculty?.name || "Not assigned"}</p>
            {p.feedback && <p>Feedback: {p.feedback}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
