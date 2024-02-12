import  { useEffect, useState } from 'react'
import UserChat from './UserChat'
import { Fetch_chat } from '../../utils/Fetch_data'
import {ChatState} from '../../Context/ChatProvider.jsx'
import {getOppUserName,getOppUser} from "../../utils/ChatLogics.js"
import { userData} from '../../../store/reducers/UserSlice.js'
import { useSelector } from 'react-redux'
const Endpoint = 'http://localhost:3000';
import io from 'socket.io-client';

import { UserState } from '../../Context/UserProvider.jsx'
const UserChatsContainer = () => {
  const {setSelectedChat,chats,setChats,fetchAgain}=ChatState();
  // const loggedUser = useSelector((state) => state.User.userdata)
  const {loggedUser} =UserState();
  const [temp, settemp] = useState()
  const getallchats = async() => {
    const response = await Fetch_chat();
    // console.log(response.data.chat)
    setChats(response.data.chat);
    // settemp(response.data.chat)
  }
  const {setSocket,passsocket}=ChatState();
  var socket;
  useEffect(()=>{
      socket=io(Endpoint);
      setSocket(socket)
      console.log("client socket")
      socket.emit('setup',loggedUser._id)
  },[])
  console.log(passsocket)
  

  useEffect(()=>{
    getallchats();
  }, [fetchAgain])
  
  return (
    <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
        {chats && chats.length>0 && chats.map((user)=>(
          // user.users && user.users[1] && user.users[1].userName ?
          <div key={user._id} onClick={()=>setSelectedChat(user)}>
            <UserChat name={getOppUserName(loggedUser,user.users)} 
            chatid={user._id}
            lastmsg={user.latestMessage&&user.latestMessage.content}
            lastmsgtime={user.latestMessage&&user.latestMessage.createdAt} 
            />
          </div>
          // :
          //  <></>
        ))}
    </div>
  )
}
export default UserChatsContainer