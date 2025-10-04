import { useState, useEffect } from "react";
import { uploadProjectFileApi, getProjectFilesApi } from "../api/projectApi";

export default function FileUploader({ projectId }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch all project files
  const fetchFiles = async () => {
    const data = await getProjectFilesApi(projectId);
    setFiles(data);
  };

  useEffect(() => {
    if (projectId) fetchFiles();
  }, [projectId]);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first");
    await uploadProjectFileApi(projectId, selectedFile);
    setSelectedFile(null);
    fetchFiles(); // Refresh file list after upload
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="font-bold mb-2">Project Files</h3>
      
      <input
        type="file"
        onChange={e => setSelectedFile(e.target.files[0])}
        className="border p-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white p-2 rounded w-full"
      >
        Upload File
      </button>

      {files.length > 0 && (
        <>
          <h4 className="mt-4 font-bold">Uploaded Files:</h4>
          <ul className="list-disc pl-5">
            {files.map(f => (
              <li key={f._id}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {f.fileName} (v{f.version})
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
