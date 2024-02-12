import ConversationNav from '../ConversationContainer/ConversationNav.jsx'
import ConversationBox from '../ConversationContainer/ConversationBox.jsx';
import BottomNav from '../ConversationContainer/BottomNav.jsx'
import io from 'socket.io-client';
var socket,selectedChatCompare;
import { UserState } from '../../Context/UserProvider.jsx'
import { useEffect } from 'react';
const Endpoint = "https://chat-sync-backend-jpn0.onrender.com";

import { ChatState } from '../../Context/ChatProvider.jsx';
const ChatWindow = () => {
    const {loggedUser} =UserState();
    // const {setSocket,passsocket}=ChatState();
    // var socket;
    // useEffect(()=>{
    //     socket=io(Endpoint);
    //     setSocket(socket)
    //     console.log("client socket")
    //     socket.emit('setup',loggedUser._id)
    // },[])
    // console.log(passsocket)
    
    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen'>
            <ConversationNav />
            <ConversationBox />
            <BottomNav />
        </div>
    )
}

export default ChatWindow;