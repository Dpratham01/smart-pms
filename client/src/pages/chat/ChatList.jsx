// Optional: list of project chats for quick navigation
import { Link } from "react-router-dom";

export default function ChatList({ projects }) {
  return (
    <ul>
      {projects.map(p => (
        <li key={p._id} className="border p-2 mb-1 rounded">
          <Link to={`/chat/${p._id}`} className="text-blue-600">{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
