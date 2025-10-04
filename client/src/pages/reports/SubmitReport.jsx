import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { submitReport } from "../../features/project/projectSlice";
import { useState } from "react";

export default function SubmitReport({ projectId }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => setFiles([...e.target.files]);

  const onSubmit = (data) => {
    dispatch(submitReport({ ...data, projectId, files: files.map(f => f.name) }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submit Weekly Report</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="number" {...register("weekNumber")} placeholder="Week Number" className="border p-2 w-full"/>
        <textarea {...register("description")} placeholder="Report Description" className="border p-2 w-full"/>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
