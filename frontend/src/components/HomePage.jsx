import AddChatNav from './add-chat/AddChatNav.jsx'
import UserChatsContainer from './add-chat/UserChatsContainer.jsx'
import ChatWindow from './chat-window/ChatWindow.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import DefaulChatBox from './DefaultChatBox.jsx'
import NewGrpDrawer from './group-chat/NewGrpDrawer.jsx'
import GrpDetsDrawer from './group-chat/GrpDetsDrawer.jsx'
import GroupChatProvider from '../context/GroupChatProvider.jsx'
import { UserState } from '../context/UserProvider.jsx'
import myhook from '../layouts/myhook.js'
import { useEffect } from 'react'
const HomePage = () => {
  const { selectedChat,passsocket } = ChatState();
    
    // const {width,height}=myhook();
    // console.log(width,height);
  
  return (
    <div className='hidden md:block'>
      {selectedChat ? <ChatWindow /> : <DefaulChatBox />}
    </div>
  )
}

export default HomePage;