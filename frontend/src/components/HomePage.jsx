import AddChatNav from './add-chat/AddChatNav.jsx'
import UserChatsContainer from './add-chat/UserChatsContainer.jsx'
import ChatWindow from './chat-window/ChatWindow.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import DefaulChatBox from './DefaultChatBox.jsx'
import NewGrpDrawer from './group-chat/NewGrpDrawer.jsx'
import GrpDetsDrawer from './group-chat/GrpDetsDrawer.jsx'
import GroupChatProvider from '../context/GroupChatProvider.jsx'
import { UserState } from '../context/UserProvider.jsx'

const HomePage = () => {
  const { selectedChat } = ChatState();

  return (
    <div className='hidden md:block'>
      {selectedChat ? <ChatWindow /> : <DefaulChatBox />}
    </div>
  )
}

export default HomePage;