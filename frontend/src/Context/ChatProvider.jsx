import { createContext,useState,useContext,useEffect } from "react";
// import { useNavigate} from 'react-router-dom'


const ChatContext = createContext();

const ChatProvider = ({children})=>{
    // const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState();
  // const [loggedUser, setloggedUser] = useState({});
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [fetchAgain,setFetchAgain]=useState(false)
  const [messages, setmessages] = useState([])
    const [passsocket,setSocket]=useState(null)
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setloggedUser(userInfo);

  //   if (!userInfo){ navigate("/");}
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [navigate]);

    return(
        <ChatContext.Provider value={
            {
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                fetchAgain,
                setFetchAgain,
                messages, setmessages,
                passsocket,setSocket
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
  