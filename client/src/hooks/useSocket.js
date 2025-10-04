import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const useSocket = (roomId, onMessage, onTyping) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit("joinRoom", roomId);

    socket.current.on("receiveMessage", onMessage);
    socket.current.on("typing", onTyping);

    return () => socket.current.disconnect();
  }, [roomId]);

  const sendMessage = (data) => socket.current.emit("sendMessage", data);
  const sendTyping = (data) => socket.current.emit("typing", data);

  return { sendMessage, sendTyping };
};
