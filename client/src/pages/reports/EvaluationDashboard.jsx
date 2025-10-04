import { useState, useEffect } from "react";
import { getEvaluationsApi, submitEvaluationApi, getAggregatedResultsApi } from "../../api/projectApi";
import { useSelector } from "react-redux";

export default function EvaluationDashboard() {
  const { user } = useSelector(state => state.auth);
  const [evaluations, setEvaluations] = useState([]);
  const [aggregatedResults, setAggregatedResults] = useState({});

  const fetchEvaluations = async () => {
    const data = await getEvaluationsApi();
    setEvaluations(data);
  };

  const fetchAggregatedResults = async (projectId) => {
    const data = await getAggregatedResultsApi(projectId);
    setAggregatedResults(prev => ({ ...prev, [projectId]: data }));
  };

  useEffect(() => { fetchEvaluations(); }, []);

  const handleSubmitEvaluation = async (evalItem, marks, feedback) => {
    await submitEvaluationApi({ projectId: evalItem.project._id, type: evalItem.type, marks, feedback });
    fetchEvaluations();
    fetchAggregatedResults(evalItem.project._id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Evaluations & Results</h2>

      <div className="space-y-4">
        {evaluations.map(evalItem => (
          <div key={evalItem._id} className="border p-4 rounded space-y-2">
            <p><strong>Project:</strong> {evalItem.project.title}</p>
            <p><strong>Type:</strong> {evalItem.type}</p>
            <p><strong>Previous Marks:</strong> {evalItem.marks ?? "Not graded"}</p>
            <p><strong>Previous Feedback:</strong> {evalItem.feedback ?? "No feedback"}</p>

            {user.role !== "student" && (
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Marks"
                  id={`marks-${evalItem._id}`}
                  className="border p-2 w-full"
                />
                <textarea
                  placeholder="Feedback"
                  id={`feedback-${evalItem._id}`}
                  className="border p-2 w-full"
                />
                <button
                  className="bg-green-600 text-white p-2 rounded w-full"
                  onClick={() => handleSubmitEvaluation(
                    evalItem,
                    Number(document.getElementById(`marks-${evalItem._id}`).value),
                    document.getElementById(`feedback-${evalItem._id}`).value
                  )}
                >
                  Submit Evaluation
                </button>
              </div>
            )}

            {aggregatedResults[evalItem.project._id] && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p><strong>Total Marks:</strong> {aggregatedResults[evalItem.project._id].totalMarks}</p>
                <p><strong>Max Marks:</strong> {aggregatedResults[evalItem.project._id].maxMarks}</p>
                <p><strong>Percentage:</strong> {aggregatedResults[evalItem.project._id].percentage.toFixed(2)}%</p>
                <p><strong>Grade:</strong> {aggregatedResults[evalItem.project._id].grade}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
