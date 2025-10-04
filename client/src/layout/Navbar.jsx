import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/user/notificationSlice"; // inside src/
import socket from "../socket"; // socket client inside src/

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.notifications);
  const unreadCount = items?.filter((n) => !n.read)?.length || 0;

  useEffect(() => {
    if (!user) return;

    // Listen for new notifications
    socket.on("newNotification", () => {
      dispatch(fetchNotifications(user._id));
    });

    // Cleanup on unmount
    return () => {
      socket.off("newNotification");
    };
  }, [user, dispatch]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold text-lg">Smart PMS</h1>

      <div className="relative">
        <i className="fas fa-bell text-xl"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
            {unreadCount}
          </span>
        )}
      </div>
    </nav>
  );
}
