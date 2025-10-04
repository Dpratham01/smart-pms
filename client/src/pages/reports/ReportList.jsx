import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, evaluateReportThunk } from "../../features/project/projectSlice";

export default function ReportList() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.project);

  useEffect(() => { dispatch(fetchReports()); }, [dispatch]);

  const handleEvaluate = (id) => {
    const feedback = prompt("Enter feedback");
    const marks = Number(prompt("Enter marks"));
    dispatch(evaluateReportThunk({ id, data: { feedback, marks, status: "reviewed" } }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Reports</h2>
      <ul className="space-y-2">
        {reports.map(r => (
          <li key={r._id} className="border p-2 rounded">
            <p>Project: {r.project.title}</p>
            <p>Week: {r.weekNumber}</p>
            <p>Status: {r.status}</p>
            {r.feedback && <p>Feedback: {r.feedback}</p>}
            {r.marks !== undefined && <p>Marks: {r.marks}</p>}
            <button onClick={() => handleEvaluate(r._id)} className="bg-green-600 text-white p-1 rounded mt-2">
              Evaluate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
