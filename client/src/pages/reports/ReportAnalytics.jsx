import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { submitReportApi, getReportsApi, evaluateReportApi } from "../../api/projectApi";
import { getProjectAnalyticsApi } from "../../api/reportApi";
import FileUploader from "../../components/FileUploader";
import Chart from "../../components/Chart";
import AIProposalFeedback from "../../components/AIProposalFeedback"; // <-- added import

export default function ReportAnalytics({ projectId }) {
  const { user } = useSelector(state => state.auth);

  const [reports, setReports] = useState([]);
  const [description, setDescription] = useState("");
  const [weekNumber, setWeekNumber] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [analytics, setAnalytics] = useState(null);

  // Fetch weekly reports
  const fetchReports = async () => {
    const data = await getReportsApi();
    setReports(data);
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    if (projectId) {
      const data = await getProjectAnalyticsApi(projectId);
      setAnalytics(data);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchAnalytics();
  }, [projectId]);

  // Student submits weekly report
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !weekNumber || !description) return alert("All fields required");
    await submitReportApi({ projectId: selectedProjectId, weekNumber, description });
    setDescription(""); setWeekNumber(""); setSelectedProjectId("");
    fetchReports();
  };

  // Faculty evaluates report
  const handleEvaluateReport = async (reportId, status, marks, feedback) => {
    await evaluateReportApi(reportId, { status, marks, feedback });
    fetchReports();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      
      {/* AI Proposal Feedback for students */}
      {user.role === "student" && projectId && (
        <AIProposalFeedback projectId={projectId} />
      )}

      {user.role === "student" && (
        <form onSubmit={handleSubmitReport} className="mb-6 space-y-2 border p-4 rounded">
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Project</option>
            {reports.map(r => r.project && <option key={r.project._id} value={r.project._id}>{r.project.title}</option>)}
          </select>
          <input
            type="number"
            placeholder="Week Number"
            value={weekNumber}
            onChange={e => setWeekNumber(e.target.value)}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Report Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
          <FileUploader projectId={selectedProjectId} />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Submit Report</button>
        </form>
      )}

      {/* Submitted Reports */}
      <h3 className="text-xl font-bold mb-2">Submitted Reports</h3>
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report._id} className="border p-4 rounded space-y-2">
            <p><strong>Project:</strong> {report.project?.title}</p>
            <p><strong>Week:</strong> {report.weekNumber}</p>
            <p><strong>Description:</strong> {report.description}</p>
            {report.files && report.files.length > 0 && (
              <p><strong>Files:</strong> {report.files.map(f => <a key={f._id} href={f.url} target="_blank" rel="noreferrer" className="text-blue-600 underline mr-2">{f.fileName}</a>)}</p>
            )}
            <p><strong>Status:</strong> {report.status || "Pending"}</p>
            <p><strong>Feedback:</strong> {report.feedback || "No feedback yet"}</p>

            {user.role === "faculty" && (
              <div className="space-y-2">
                <input type="number" placeholder="Marks" className="border p-2 w-full" id={`marks-${report._id}`} />
                <textarea placeholder="Feedback" className="border p-2 w-full" id={`feedback-${report._id}`}></textarea>
                <button
                  className="bg-green-600 text-white p-2 rounded w-full"
                  onClick={() => handleEvaluateReport(
                    report._id,
                    "Reviewed",
                    Number(document.getElementById(`marks-${report._id}`).value),
                    document.getElementById(`feedback-${report._id}`).value
                  )}
                >
                  Submit Evaluation
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analytics */}
      {analytics && (
        <div className="border p-4 rounded mt-6">
          <h2 className="text-2xl font-bold mb-4">Project Analytics</h2>
          <p>Total Marks: {analytics.totalMarks}</p>
          <p>Max Marks: {analytics.maxMarks}</p>
          <p>Percentage: {analytics.percentage.toFixed(2)}%</p>

          <div className="mt-4">
            <Chart data={analytics.evaluations.map(e => ({ name: e.evaluator.name, marks: e.marks }))} />
          </div>
        </div>
      )}
    </div>
  );
}
