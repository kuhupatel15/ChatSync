import ConversationNav from '../chat-window/ConversationNav.jsx'
import ConversationBox from '../chat-window/ConversationBox.jsx';
import BottomNav from '../chat-window/BottomNav.jsx'
import { useSelector } from 'react-redux';

const ChatWindow = () => {
    const selectedChat = useSelector(({selectedchat}) => selectedchat.chat)

    return (
        <div className='w-[60vw] bg-[#36393F] flex flex-col h-screen '>
            <ConversationNav />
            <ConversationBox selectedChat={selectedChat} />
            <BottomNav />
        </div>
    )
}

export default ChatWindow;