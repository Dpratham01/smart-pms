import { useState } from "react";
import { getSummaryApi } from "../../api/aiApi";

export default function SummaryAssistant() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const result = await getSummaryApi(text);
    setSummary(result);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Report Summary Assistant</h2>
      <textarea
        className="border p-2 w-full mb-2"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste your weekly report here"
      />
      <button onClick={handleSummarize} className="bg-green-600 text-white p-2 rounded">Summarize</button>
      {summary && <div className="mt-4 p-2 border bg-gray-100 rounded">{summary}</div>}
    </div>
  );
}
