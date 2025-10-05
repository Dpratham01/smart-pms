import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          <h1 className="text-2xl">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Role: {user?.role}</p>

          <button
            onClick={() => dispatch(logout())}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>

          {/* Render nested dashboard pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
