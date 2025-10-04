import { useEffect, useState } from "react";
import { getProjectFilesApi } from "../../api/projectApi";
import FileUploader from "../../components/FileUploader";

export default function ProjectFiles({ projectId }) {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => setFiles(await getProjectFilesApi(projectId));

  useEffect(() => { loadFiles(); }, [projectId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Project Files</h2>
      <FileUploader projectId={projectId} type="report" onUploaded={loadFiles}/>
      <ul className="mt-2 space-y-2">
        {files.map(f => (
          <li key={f._id} className="border p-2 rounded">
            <a href={f.url} target="_blank" className="text-blue-600 underline">{f.filename} (v{f.version})</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
