import { createContext,useState,useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({children})=>{
    const [selectedChat, setSelectedChat] = useState();
  const [loggedUser, setloggedUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [fetchAgain,setFetchAgain]=useState(false)
    return(
        <ChatContext.Provider value={
            {
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                loggedUser,
                setloggedUser,
                fetchAgain,
                setFetchAgain
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
  