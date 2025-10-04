import { useSelector } from "react-redux";

export default function Navbar() {
  const { items } = useSelector(state => state.notifications);
  const unreadCount = items.filter(n => !n.read).length;

  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="font-bold">Project Management System</h1>
      <div>
        <span className="bg-red-600 text-white rounded-full px-2 text-sm">
          {unreadCount}
        </span>
      </div>
    </nav>
  );
}
