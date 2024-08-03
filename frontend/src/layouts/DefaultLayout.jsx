import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import { useEffect } from 'react'
import io from 'socket.io-client';
import { backendUri } from '../utils/BackendUri.js';
import { useDispatch, useSelector } from 'react-redux'
import { setsocket } from '../../store/reducers/socketSlice.js'

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
        <div className='w-full md:w-[40vw] h-full relative bg-pri'>
          <AddChatNav />
          <UserChatsContainer />
        </div>

        <div className='md:w-[60vw] overflow-y-auto h-full bg-sec'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout;
