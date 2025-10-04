import DashboardLayout from "../../layout/DashboardLayout";

export default function StudentDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Welcome, Student!</h2>
      <p className="mt-2">Manage your projects, submissions, and reports here.</p>
    </DashboardLayout>
  );
}
