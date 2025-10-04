import { useState } from "react";
import { submitEvaluationApi } from "../../api/projectApi";

export default function EvaluationForm({ projectId, type, onSubmitted }) {
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    await submitEvaluationApi({ projectId, type, marks: Number(marks), feedback });
    setMarks(""); setFeedback("");
    onSubmitted();
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold mb-2">{type} Evaluation</h3>
      <input type="number" placeholder="Marks" value={marks} onChange={e => setMarks(e.target.value)}
             className="border p-2 mb-2 w-full"/>
      <textarea placeholder="Feedback" value={feedback} onChange={e => setFeedback(e.target.value)}
                className="border p-2 mb-2 w-full"/>
      <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded w-full">Submit</button>
    </div>
  );
}
