import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvaluationsThunk } from "../../features/project/projectSlice";

export default function EvaluationList() {
  const dispatch = useDispatch();
  const { evaluations } = useSelector(state => state.project);

  useEffect(() => { dispatch(fetchEvaluationsThunk()); }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Evaluations</h2>
      <ul className="space-y-2">
        {evaluations.map(e => (
          <li key={e._id} className="border p-2 rounded">
            <p>Project: {e.project.title}</p>
            <p>Type: {e.type}</p>
            <p>Marks: {e.marks}</p>
            <p>Feedback: {e.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
