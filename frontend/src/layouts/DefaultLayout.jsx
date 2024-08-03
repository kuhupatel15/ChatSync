import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import NewGrpDrawer from '../components/group-chat/NewGrpDrawer.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import { useEffect } from 'react'
import io from 'socket.io-client';
import { backendUri } from '../utils/BackendUri.js';
import { useDispatch, useSelector } from 'react-redux'
import { setsocket } from '../../src/store/reducers/socketSlice.js'

const DefaultLayout = ({ children }) => {

  const user = useSelector(({auth}) => auth.userData)
  const dispatch = useDispatch();

  var socket;

  useEffect(() => {
    socket = io(backendUri);
    dispatch(setsocket(socket))
    if (user){
      socket.emit('setup', user._id)
    } 
    socket.on('connected')
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
