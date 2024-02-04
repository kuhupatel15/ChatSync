import { useEffect } from 'react'
import UserChatsContainer from './AddChat/UserChatsContainer'
import ConversationBox from './ConversationContainer/ConversationBox'
// eslint-disable-next-line no-unused-vars
import { Add_chat, Create_group, Fetch_chat, Get_all_messages, Get_all_users, Rename_group, Send_message } from '../utils/Fetch_data'
import AddChatNav from './AddChat/AddChatNav'
import ConversationNav from './ConversationContainer/ConversationNav'
import BottomNav from './ConversationContainer/BottomNav'
// import { TextInput } from 'flowbite-react'
const Home_Page = () => {
  return (
    <div className='flex h-[100vh]'>
      <div className='w-[40vw] h-full bg-[#2F3136]'>
        <AddChatNav></AddChatNav>
        
        <UserChatsContainer></UserChatsContainer>
      </div>
      <div className='w-[60vw] bg-[#36393F]'>
        <ConversationNav></ConversationNav>
        <ConversationBox></ConversationBox>
        <BottomNav></BottomNav>
      </div>
    </div>
  )
}

export default Home_Page