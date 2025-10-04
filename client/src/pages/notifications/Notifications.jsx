import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationRead } from "../../features/user/notificationSlice";

export default function Notifications({ user }) {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.notifications);

  // Fetch notifications on component mount or when user changes
  useEffect(() => {
    if (user) dispatch(fetchNotifications(user._id));
  }, [user]);

  // Mark a notification as read
  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {items.length === 0 && <p>No notifications</p>}
      <ul className="space-y-2">
        {items.map(n => (
          <li
            key={n._id}
            className={`p-2 border rounded ${n.read ? "bg-gray-200" : "bg-white"}`}
          >
            <p className="font-semibold">{n.message}</p>
            {n.link && (
              <a href={n.link} className="text-blue-600 underline">
                View
              </a>
            )}
            {!n.read && (
              <button
                onClick={() => handleMarkRead(n._id)}
                className="ml-2 bg-green-600 text-white p-1 rounded text-sm"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
