import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitEvaluationThunk } from "../../features/project/projectSlice";

export default function EvaluationForm({ projectId }) {
  const dispatch = useDispatch();
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("mid");

  const handleSubmit = () => {
    dispatch(submitEvaluationThunk({ projectId, type, marks: Number(marks), feedback }));
  };

  return (
    <div className="border p-4 rounded max-w-md">
      <h2 className="text-xl font-bold mb-2">Submit Evaluation</h2>
      <select value={type} onChange={e => setType(e.target.value)} className="border p-2 w-full mb-2">
        <option value="mid">Mid-Term</option>
        <option value="final">Final</option>
      </select>
      <input type="number" value={marks} onChange={e => setMarks(e.target.value)} placeholder="Marks" className="border p-2 w-full mb-2"/>
      <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Feedback" className="border p-2 w-full mb-2"/>
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded">Submit</button>
    </div>
  );
}
