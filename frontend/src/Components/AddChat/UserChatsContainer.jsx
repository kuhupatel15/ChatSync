import  { useEffect, useState } from 'react'
import UserChat from './UserChat'
import { Fetch_chat } from '../../utils/Fetch_data'
import {ChatState} from '../../Context/ChatProvider.jsx'
import {getOppUserName,getOppUser} from "../../utils/ChatLogics.js"
import { userData} from '../../../store/reducers/UserSlice.js'
import { useSelector } from 'react-redux'
const UserChatsContainer = () => {
  const {setSelectedChat,chats,setChats,fetchAgain,loggedUser}=ChatState();
  // const loggedUser = useSelector((state) => state.User.userdata)

  const [temp, settemp] = useState()
  const getallchats = async() => {
    const response = await Fetch_chat();
    // console.log(response.data.chat)
    setChats(response.data.chat);
    // settemp(response.data.chat)
  }
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
            />
          </div>
          // :
          //  <></>
        ))}
    </div>
  )
}
export default UserChatsContainer