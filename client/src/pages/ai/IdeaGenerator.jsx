import { useState } from "react";
import { getFeedbackApi } from "../../api/aiApi";

export default function IdeaGenerator() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleGenerate = async () => {
    const result = await getFeedbackApi(input);
    setFeedback(result);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">AI Feedback Generator</h2>
      <textarea
        className="border p-2 w-full mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your proposal/report here"
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white p-2 rounded">Generate Feedback</button>
      {feedback && <div className="mt-4 p-2 border bg-gray-100 rounded">{feedback}</div>}
    </div>
  );
}
