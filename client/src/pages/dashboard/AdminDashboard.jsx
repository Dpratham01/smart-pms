import DashboardLayout from "../../layout/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
      <p className="mt-2">Manage users, projects, and system settings here.</p>
    </DashboardLayout>
  );
}
