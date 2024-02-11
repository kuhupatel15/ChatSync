import ConversationNav from '../ConversationContainer/ConversationNav'
import ConversationBox from '../ConversationContainer/ConversationBox';
import BottomNav from '../ConversationContainer/BottomNav'
import io from 'socket.io-client';
var socket,selectedChatCompare;
import { UserState } from '../../Context/UserProvider.jsx'
import { useEffect } from 'react';
const Endpoint = 'http://localhost:3000';
import { ChatState } from '../../Context/ChatProvider.jsx';
const ChatWindow = () => {
    const {loggedUser} =UserState();
    const {setSocket,passsocket}=ChatState();
    var socket;
    useEffect(()=>{
        socket=io(Endpoint);
        setSocket(socket)
        socket.emit('setup',loggedUser._id)
        console.log(socket)
      },[])
     
    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen'>
            <ConversationNav />
            <ConversationBox />
            <BottomNav />
        </div>
    )
}

export default ChatWindow;