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
  const {loggedUser} = UserState();

  return (
    <div>
      {/* <GroupChatProvider> */}
        <div className='flex h-[100vh] overflow-hidden'>
          <div className='w-[40vw] relative h-full bg-[#2F3136]'>
            <AddChatNav />
            <UserChatsContainer />
            <NewGrpDrawer />
          </div>
          <div className='w-[60vw] bg-[#36393F]'>
            {selectedChat ? <ChatWindow /> : <DefaulChatBox />}
          </div>
        </div>
      {/* </GroupChatProvider> */}
    </div>
  )
}

export default HomePage;