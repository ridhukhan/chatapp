import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) return;

    const newSocket = io("http://localhost:8000", {
      query: { userId: authUser._id },
    });

    setSocket(newSocket);

    console.log("Socket connected?", newSocket.connected);

    newSocket.on("connect", () => {
      console.log("Socket.io connected with id:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (users) => {
      console.log("Online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      console.log("Socket disconnected");
      newSocket.off("getOnlineUsers");
      newSocket.close();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
