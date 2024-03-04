import { useEffect, useState } from 'react'
import UserChat from './UserChat.jsx'
import { Fetch_chat } from '../../utils/FetchData.js'
import { ChatState } from '../../context/ChatProvider.jsx'
import { getOppUserName, getOppUser } from "../../utils/ChatLogics.js"
import { userData } from '../../../store/reducers/UserSlice.js'
import { useSelector } from 'react-redux'
import { UserState } from '../../context/UserProvider.jsx'
import { backendUri } from '../../utils/BackendUri.js';
import io from 'socket.io-client';

const UserChatsContainer = () => {
  const [temp, settemp] = useState()

  const { loggedUser } = UserState();

  const { setSelectedChat, notifications,chats, setChats, fetchAgain, setSocket, setSocketConnected } = ChatState();
  var socket;

  const getallchats = async () => {
    const response = await Fetch_chat();
    setChats(response.data.chat);
    // console.log(response.data.chat)
  }

  useEffect(() => {
    socket = io(backendUri);
    setSocket(socket)
    if (loggedUser) socket.emit('setup', loggedUser._id)
    socket.on('connected', () => setSocketConnected(true))
  }, [])

  useEffect(() => {
    getallchats();
  }, [fetchAgain,notifications])

  // const handleChat = (user)=>{

  // }
  return (
    <div className=''>
      <div className='max-h-[80vh] my-2 flex flex-col  overflow-scroll' >
        {chats && chats.length > 0 && chats.map((user) => (
        <div key={user._id} onClick={() => {setSelectedChat(user);if(notifications.has(user._id)){
          notifications.delete(user._id)}}}>
          <UserChat chat={user}
            // name={user.users.length > 2 ? user.chatName : getOppUserName(loggedUser, user.users)}
            // chatid={user._id}
            // lastmsg={user.latestMessage && user.latestMessage.content}
            // lastmsgtime={user.latestMessage && user.latestMessage.createdAt}
            // grpProfileimg={user.grpProfileimg}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserChatsContainer