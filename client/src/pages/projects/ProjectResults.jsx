import { useEffect, useState } from "react";
import { getAggregatedResultsApi } from "../../api/projectApi";

export default function ProjectResults({ projectId }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => setResults(await getAggregatedResultsApi(projectId));
    fetchResults();
  }, [projectId]);

  if (!results) return <p>Loading...</p>;

  return (
    <div className="border p-4 rounded">
      <h3 className="font-bold mb-2">Aggregated Results</h3>
      <p>Total Marks: {results.totalMarks} / {results.maxMarks}</p>
      <p>Percentage: {results.percentage.toFixed(2)}%</p>
      <p>Grade: <span className="font-bold">{results.grade}</span></p>
      <h4 className="mt-2 font-bold">Individual Evaluations:</h4>
      <ul className="list-disc pl-5">
        {results.evaluations.map(e => (
          <li key={e._id}>{e.evaluator.name} ({e.type}): {e.marks}/{e.maxMarks} — {e.feedback}</li>
        ))}
      </ul>
    </div>
  );
}
