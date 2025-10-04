import { useEffect, useState } from "react";
import { getNotificationsApi, markNotificationReadApi } from "../api/notificationApi";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const data = await getNotificationsApi();
    setNotifications(data);
  };

  const handleRead = async (id) => {
    await markNotificationReadApi(id);
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
  };

  useEffect(() => { fetchNotifications(); }, []);

  return (
    <div className="p-2 border rounded w-80 bg-white shadow-md">
      <h3 className="font-bold mb-2">Notifications</h3>
      <ul className="space-y-1">
        {notifications.map(n => (
          <li key={n._id} className={`p-2 rounded ${n.read ? "bg-gray-100" : "bg-blue-100"}`}>
            <p>{n.message}</p>
            {n.link && <a href={n.link} className="text-blue-600 underline">View</a>}
            {!n.read && (
              <button
                onClick={() => handleRead(n._id)}
                className="ml-2 text-sm text-green-600"
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
