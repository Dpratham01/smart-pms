import { useState } from "react";
import { getAIProposalFeedbackApi } from "../api/projectApi";

export default function AIProposalFeedback({ projectId }) {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetFeedback = async () => {
    if (!text) return alert("Enter project proposal text");
    setLoading(true);
    try {
      const res = await getAIProposalFeedbackApi(projectId, text);
      setFeedback(res.feedback);
    } catch (err) {
      console.error(err);
      alert("Failed to get AI feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="text-xl font-bold">AI Proposal Feedback</h3>
      <textarea
        className="border p-2 w-full"
        placeholder="Paste your project proposal here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleGetFeedback}
        className="bg-purple-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Getting Feedback..." : "Get AI Feedback"}
      </button>
      {feedback && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h4 className="font-semibold">AI Feedback:</h4>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
