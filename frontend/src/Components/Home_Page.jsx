import React, { useEffect,useState } from 'react'
import Logout from './Logout_btn'
import { Add_chat, Add_to_group, Create_group, Fetch_chat, Get_all_messages, Get_all_users, Remove_member_from_group, Rename_group, Send_message } from '../utils/Fetch_data'
import AddChatNav from './AddChat/AddChatNav'
import UserChatsContainer from './AddChat/UserChatsContainer'
import ChatWindow from './ConversationContainer/ChatWindow'
import { Button } from 'flowbite-react'
import { ChatState} from '../Context/ChatProvider.jsx'
import DefaulChatBox from './DefaulChatBox'
import UserProvider from '../Context/UserProvider.jsx'
import NewGroupDrawer from './GroupChat/NewGroupDrawer.jsx'
import GroupChatProvider from '../Context/GroupChatProvider.jsx'
const Home_Page = () => {
  // const [users,setusers] =useState([]);
  const {selectedChat} = ChatState();
  // const getdata = async () => {
    // const response = await Get_all_users();
    // const response = await Add_chat({receiver_id: "65bfea7f10ffeedb377b524d"})
    // const response = await Fetch_chat()
    // const response = await Get_all_messages("")
    // const response = await Create_group({ 
    //   users: ["65bbb355740a25af8d0d32e2", "65bbc6d9d9e8a9b627af8c30"], 
    //   grpname: "mc" 
    // });
    // const response = await Rename_group({ chatId: "65bbc9d6e09f5e95cbd1dfd7", newgrpname: "gakpo" })
    // const response = await Remove_member_from_group({ chatId: "65bbc9d6e09f5e95cbd1dfd7", newgrpname: "gakpo" })
    // console.log(response.data)
    // setusers(response.data.chat.users);
  // }
  // console.log(users)

  // useEffect(() => {
  //   getdata()
  // }, [])

  return (
    // <UserProvider>
      <GroupChatProvider>
    <div className='flex h-[100vh]'>
      <div className='w-[40vw] relative h-full bg-[#2F3136]'>
        <AddChatNav />
        <UserChatsContainer />
        <NewGroupDrawer></NewGroupDrawer>
      </div>
      <div className='w-[60vw] bg-[#36393F]'>
       {selectedChat ? <ChatWindow />:<DefaulChatBox />}
      </div>
    </div>
    </GroupChatProvider>
    // </UserProvider>
  )
}

export default Home_Page;