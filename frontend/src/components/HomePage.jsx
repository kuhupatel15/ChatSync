import AddChatNav from './add-chat/AddChatNav.jsx'
import UserChatsContainer from './add-chat/UserChatsContainer.jsx'
import ChatWindow from './chat-window/ChatWindow.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import DefaulChatBox from './DefaultChatBox.jsx'
import NewGrpDrawer from './group-chat/NewGrpDrawer.jsx'
import GroupChatProvider from '../context/GroupChatProvider.jsx'

const HomePage = () => {
  const { selectedChat } = ChatState();

  return (
    <div>
      <GroupChatProvider>
        <div className='flex h-[100vh]'>
          <div className='w-[40vw] relative h-full bg-[#2F3136]'>
            <AddChatNav />
            <UserChatsContainer />
            <NewGrpDrawer />
          </div>
          <div className='w-[60vw] bg-[#36393F]'>
            {selectedChat ? <ChatWindow /> : <DefaulChatBox />}
          </div>
        </div>
      </GroupChatProvider>
    </div>
  )
}

export default HomePage;