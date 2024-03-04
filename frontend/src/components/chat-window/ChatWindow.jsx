import ConversationNav from '../chat-window/ConversationNav.jsx'
import ConversationBox from '../chat-window/ConversationBox.jsx';
import BottomNav from '../chat-window/BottomNav.jsx'
import { ChatState} from '../../context/ChatProvider.jsx'

const ChatWindow = () => {
    const {selectedChat}=ChatState();
    // var socket;
    // useEffect(()=>{
    //     socket=io(backendUri);
    //     setSocket(socket)
    //     console.log("client socket")
    //     socket.emit('setup',loggedUser._id)
    // },[])
    // console.log(passsocket)

    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen '>
            <ConversationNav />
            <ConversationBox selectedChat={selectedChat}/>
            <BottomNav />
        </div>
    )
}

export default ChatWindow;