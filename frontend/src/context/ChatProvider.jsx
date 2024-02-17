import { createContext, useState, useContext, useEffect } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false)
  const [messages, setmessages] = useState([])
  const [passsocket, setSocket] = useState(null)
  const [isTyping,setIsTyping]=useState(false)
  const [typing,setTyping]=useState(false)

  const [socketConnected,setSocketConnected]=useState(false)
  // const [loggedUser, setloggedUser] = useState({});
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setloggedUser(userInfo);
  //   if (!userInfo){ navigate("/");}
  // }, [navigate]);

  return (
    <ChatContext.Provider value={
      {
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchAgain,
        setFetchAgain,
        messages, setmessages,
        passsocket, setSocket,
        socketConnected,setSocketConnected,
        isTyping,setIsTyping,
        typing,setTyping
      }
    }>
      {children}
    </ChatContext.Provider>
  )
}
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
