import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProject } from "../../features/project/projectSlice";
import { useState, useEffect } from "react";
import { getProposalFeedbackApi, checkTopicClashApi, checkSimilarity } from "../../api/aiApi";
import { createProjectApi } from "../../api/projectApi";

export default function CreateProject() {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();

  const [similarity, setSimilarity] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [clashes, setClashes] = useState([]);
  const watchTitle = watch("title");
  const watchDescription = watch("description");

  // Check high similarity projects
  const handleCheckSimilarity = async () => {
    if (!watchTitle) return;
    const result = await checkSimilarity(watchTitle);
    setSimilarity(result.filter(r => r.similarity > 0.5));
  };

  // Check for topic clash
  const handleCheckClash = async () => {
    if (!watchTitle) return;
    const { clashes } = await checkTopicClashApi(watchTitle);
    setClashes(clashes);
  };

  // Generate AI feedback for proposal
  const handleGenerateFeedback = async () => {
    if (!watchTitle || !watchDescription) return;
    const res = await getProposalFeedbackApi(watchTitle, watchDescription);
    setFeedback(res.feedback);
  };

  const onSubmit = async (data) => {
    // Validation: prevent submission if high similarity exists
    if (similarity.length > 0) {
      alert("Similar project titles exist. Please modify your title.");
      return;
    }
    // Validation: prevent submission if topic clashes
    if (clashes.length > 0) {
      alert(`Topic clashes with existing projects: ${clashes.join(", ")}`);
      return;
    }

    // Save project via API
    const created = await createProjectApi(data);
    dispatch(addProject(created));
    alert("Project submitted successfully!");
    setFeedback("");
    setSimilarity([]);
    setClashes([]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Submit Project Proposal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input 
          {...register("title")} 
          placeholder="Title" 
          className="border p-2 w-full"
        />

        <div className="flex space-x-2">
          <button 
            type="button" 
            onClick={handleCheckSimilarity} 
            className="bg-yellow-500 text-white p-2 rounded flex-1"
          >
            Check Similarity
          </button>

          <button 
            type="button" 
            onClick={handleCheckClash} 
            className="bg-red-500 text-white p-2 rounded flex-1"
          >
            Check Topic Clash
          </button>
        </div>

        {similarity.length > 0 && (
          <div className="text-red-600 mt-2 border p-2 rounded bg-red-100">
            <h4 className="font-bold">Similar Projects:</h4>
            <ul>
              {similarity.map(s => (
                <li key={s.title}>{s.title} ({(s.similarity*100).toFixed(0)}%)</li>
              ))}
            </ul>
          </div>
        )}

        {clashes.length > 0 && (
          <div className="text-red-800 mt-2 border p-2 rounded bg-red-200">
            <h4 className="font-bold">Topic Clashes:</h4>
            <p>{clashes.join(", ")}</p>
          </div>
        )}

        <input 
          {...register("domain")} 
          placeholder="Domain" 
          className="border p-2 w-full"
        />

        <textarea 
          {...register("description")} 
          placeholder="Description" 
          className="border p-2 w-full"
        />

        <button 
          type="button" 
          onClick={handleGenerateFeedback} 
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Generate AI Feedback
        </button>

        {feedback && (
          <p className="mt-2 text-blue-700 border p-2 rounded bg-blue-100">{feedback}</p>
        )}

        <button 
          type="submit" 
          className="bg-green-600 text-white p-2 rounded w-full"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}
