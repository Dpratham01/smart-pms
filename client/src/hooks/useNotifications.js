import { useEffect } from "react";
import { getIO } from "../../server/sockets/chatSocket";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/user/notificationSlice";

export const useNotifications = (user) => {
  const dispatch = useDispatch();
  const socket = getIO();

  useEffect(() => {
    if (!user) return;

    socket.on("newNotification", () => {
      dispatch(fetchNotifications(user._id));
    });

    return () => socket.off("newNotification");
  }, [user]);
};
