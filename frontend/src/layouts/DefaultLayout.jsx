import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import NewGrpDrawer from '../components/group-chat/NewGrpDrawer.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import { useEffect } from 'react'
const DefaultLayout = ({ children }) => {
  const { notifications,setNotifications,selectedChat, setSelectedChat, fetchAgain, setFetchAgain, passsocket,messages, setmessages } = ChatState();

  useEffect(() => {
    passsocket && passsocket.on("message-recieved", (msg) => {
      console.log(msg)
      if (
        !selectedChat || (selectedChat._id != msg.chat._id)
      ) {
        console.log("setnotification")
        setNotifications(notifications.set(msg.chat._id,[msg._id]))
        // setFetchAgain(!fetchAgain)
      }
      else {
        if(notifications.has(selectedChat._id)){
          console.log("deletenotification")
          notifications.delete(selectedChat._id)
        }else{
          console.log("setmessage")
        setmessages([...messages,msg]);
        setFetchAgain(!fetchAgain) }
      }
    })
  })
  return (
    <div>
      <div className='flex h-[100vh] overflow-hidden'>
        <div className='w-[40vw] h-full relative bg-[#2F3136]'>
          <AddChatNav />
          <UserChatsContainer />
          <NewGrpDrawer />
        </div>
        <div className='w-[60vw] overflow-y-auto h-full bg-[#36393F]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout;
