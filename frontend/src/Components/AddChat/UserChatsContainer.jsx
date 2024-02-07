import  { useEffect, useState } from 'react'
import UserChat from './UserChat'
import { Fetch_chat } from '../../utils/Fetch_data'
import {ChatState} from '../../Context/ChatProvider.jsx'

const UserChatsContainer = () => {
  const {selectedChat,setSelectedChat,chats,setChats}=ChatState();
  
  
  const getallchats = async () => {
    const response = await Fetch_chat();
    // console.log(response.data.chat)
    setChats(response.data.chat)
  }
 
  useEffect(()=>{
    getallchats();
  }, [])
  
  
  return (
    <div className='max-h-[40vw] overflow-scroll scrollbar-hide' >
        {chats && chats.map((user)=>(
          user.users && user.users[1] && user.users[1].userName ?
          <div key={user.users[1]._id} onClick={()=>setSelectedChat(user)}>
            <UserChat name={user.users[1].userName} 
            chatid={user.users[1]._id} 
            />
          </div>
          :
           <></>
        ))}
    </div>
  )
}
export default UserChatsContainer