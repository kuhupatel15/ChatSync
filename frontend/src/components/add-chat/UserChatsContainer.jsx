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

  // const { loggedUser } = UserState();
  const loggedUser = useSelector((state)=>state.User.userdata)
  console.log(loggedUser)
  const { setSelectedChat, chats, setChats, fetchAgain, setSocket, passsocket } = ChatState();
  var socket;

  const getallchats = async () => {
    const response = await Fetch_chat();
    setChats(response.data.chat);
  }

  useEffect(() => {
    socket = io(backendUri);
    setSocket(socket)
    if(loggedUser) socket.emit('setup', loggedUser._id)
  }, [])

  useEffect(() => {
    getallchats();
  }, [fetchAgain])

  return (
    <div className='max-h-[40vw] my-2 flex flex-col  overflow-scroll scrollbar-hide' >
      {chats && chats.length > 0 && chats.map((user) => (
        <div key={user._id} onClick={() => setSelectedChat(user)}>
          <UserChat name={getOppUserName(loggedUser, user.users)}
            chatid={user._id}
            lastmsg={user.latestMessage && user.latestMessage.content}
            lastmsgtime={user.latestMessage && user.latestMessage.createdAt}
          />
        </div>
      ))}
    </div>
  )
}

export default UserChatsContainer