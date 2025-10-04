import { useSelector } from "react-redux";
import StudentDashboard from "./StudentDashboard";
import FacultyDashboard from "./FacultyDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  useNotifications(user);
  
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {user.role === "student" && <StudentDashboard />}
      {user.role === "faculty" && <FacultyDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
}
