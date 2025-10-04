import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const links = {
    admin: [{ name: "Dashboard", path: "/dashboard/admin" }],
    faculty: [{ name: "Dashboard", path: "/dashboard/faculty" }],
    student: [{ name: "Dashboard", path: "/dashboard/student" }],
  };

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold border-b border-blue-700">
        {user.role.toUpperCase()} DASHBOARD
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links[user.role].map((link) => (
          <button
            key={link.name}
            onClick={() => navigate(link.path)}
            className="block w-full text-left p-2 rounded hover:bg-blue-800"
          >
            {link.name}
          </button>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="p-3 bg-red-600 hover:bg-red-700 w-full"
      >
        Logout
      </button>
    </aside>
  );
}
