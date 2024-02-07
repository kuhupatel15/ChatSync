import { createContext,useState,useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [selectedChat, setSelectedChat] = useState();
//   const [users, setusers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
    return(
        <ChatContext.Provider value={
            {
                selectedChat,
                setSelectedChat,
                chats,
                setChats
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
  