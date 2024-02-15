import ConversationNav from '../chat-window/ConversationNav.jsx'
import ConversationBox from '../chat-window/ConversationBox.jsx';
import BottomNav from '../chat-window/BottomNav.jsx'


const ChatWindow = () => {
    // const {setSocket,passsocket}=ChatState();
    // var socket;
    // useEffect(()=>{
    //     socket=io(backendUri);
    //     setSocket(socket)
    //     console.log("client socket")
    //     socket.emit('setup',loggedUser._id)
    // },[])
    // console.log(passsocket)

    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen border-l border-gray-600'>
            <ConversationNav />
            <ConversationBox />
            <BottomNav />
        </div>
    )
}

export default ChatWindow;