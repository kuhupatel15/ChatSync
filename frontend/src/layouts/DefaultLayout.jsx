import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import NewGrpDrawer from '../components/group-chat/NewGrpDrawer.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import { useEffect } from 'react'
import io from 'socket.io-client';
import { backendUri } from '../utils/BackendUri.js';
import { useSelector } from 'react-redux'

const DefaultLayout = ({ children }) => {

  const user = useSelector(({auth}) => auth.userData)
  const { setSocket, setSocketConnected } = ChatState();

  var socket;

  useEffect(() => {
    socket = io(backendUri);
    setSocket(socket)
    if (user){
      socket.emit('setup', user._id)
      console.log('\x1b[33m%s\x1b[0m',"2 ", "sent ", "setup(user._id) --> backend ", user._id)
    } 
    socket.on('connected', () => setSocketConnected(true))
    console.log('\x1b[33m%s\x1b[0m',"6 ", "recieved ", "connected")
  }, [])

  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        <div className='w-full md:w-[40vw] h-full relative bg-[#2F3136]'>
          <AddChatNav />
          <UserChatsContainer />
          <NewGrpDrawer />
        </div>

        <div className='md:w-[60vw] overflow-y-auto h-full bg-[#36393F]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout;
