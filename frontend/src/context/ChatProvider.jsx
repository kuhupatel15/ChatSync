import { createContext, useState, useContext } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(new Map());
  const [socketConnected, setSocketConnected] = useState(false)

  return (
    <ChatContext.Provider value={{
      socketConnected, setSocketConnected,
      notifications, setNotifications
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
