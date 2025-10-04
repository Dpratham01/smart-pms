import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/storage";
import { getProjectMessagesApi } from "../../api/projectApi";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { auth: { token: getToken() } });

export default function ChatRoom({ user }) {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getProjectMessagesApi(projectId);
      setMessages(data);
    };
    fetchMessages();

    socket.emit("joinRoom", projectId);

    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("typing", (typingUser) => {
      if (!typingUsers.includes(typingUser)) {
        setTypingUsers(prev => [...prev, typingUser]);
        setTimeout(() => setTypingUsers(prev => prev.filter(u => u !== typingUser)), 2000);
      }
    });

    return () => socket.off();
  }, [projectId]);

  const handleSend = () => {
    if (!input) return;
    socket.emit("sendMessage", { projectId, sender: user._id, content: input });
    setInput("");
  };

  const handleTyping = () => {
    socket.emit("typing", { projectId, user: user.name });
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto border p-2 rounded space-y-2">
        {messages.map(m => (
          <div key={m._id} className={`p-2 rounded ${m.sender._id === user._id ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
            <p className="text-sm font-bold">{m.sender.name}</p>
            <p>{m.content}</p>
          </div>
        ))}
        {typingUsers.length > 0 && <p className="italic text-gray-500">{typingUsers.join(", ")} typing...</p>}
      </div>
      <div className="mt-2 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleTyping}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded">Send</button>
      </div>
    </div>
  );
}
