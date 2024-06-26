import AddChatNav from '../components/add-chat/AddChatNav.jsx'
import UserChatsContainer from '../components/add-chat/UserChatsContainer.jsx'
import NewGrpDrawer from '../components/group-chat/NewGrpDrawer.jsx'
import { ChatState } from '../context/ChatProvider.jsx'
import { useEffect } from 'react'
import io from 'socket.io-client';
import { backendUri } from '../utils/BackendUri.js';
import { UserState } from '../context/UserProvider.jsx'
import { Get_all_messages, Read_Message } from '../utils/FetchData.js'

const DefaultLayout = ({ children }) => {
  var socket;
  const { loggedUser } = UserState();
  const { notifications,setNotifications,selectedChat,setSocket, setSelectedChat,socketConnected, fetchAgain, setSocketConnected,setFetchAgain, passsocket,messages, setmessages } = ChatState();
  useEffect(() => {
    socket = io(backendUri);
    setSocket(socket)
    if (loggedUser) socket.emit('setup', loggedUser._id)
    socket.on('connected', () => setSocketConnected(true))
  }, [])
  const setReadBy = async (msgid) => {
    const response = await Read_Message({ msgId: msgid, userId: loggedUser._id })
    console.log(response)
  }
  console.log(socket)
  useEffect(() => {
    console.log('msg')
    passsocket && passsocket.on("message-recieved", (msg) => {
      console.log(msg)
      if (!selectedChat || (selectedChat._id !== msg.chat._id)) {
        console.log("setnotification")
        
        console.log(notifications.has(msg.chat._id))
        if(notifications?.has(msg.chat._id)){
          let pre = notifications.get(msg.chat._id)
          !pre.includes(msg) && setNotifications(notifications.set(msg.chat._id,[...pre,msg]))
        }
        else{
          
          setNotifications(notifications.set(msg.chat._id,[msg]))
        }
        console.log(notifications?.get(msg.chat._id)?.length)
        // setFetchAgain(!fetchAgain)
      }
      else {
        if(notifications.has(selectedChat._id)){
          console.log("deletenotification")
          notifications.delete(selectedChat._id)
        }
        console.log(!msg.readBy.includes(loggedUser._id))

        // !msg.readBy.includes(loggedUser._id) && 
        setReadBy(msg._id)
        setmessages([...messages, msg]);
        
        // setFetchAgain(!fetchAgain)
        }
      
    })
  })

  
  // useEffect(() => {
  //   console.log('msg')
  //   passsocket && passsocket.on("message-recieved", (msg) => {
  //     console.log(msg)
  //     if (
  //       !selectedChat || (selectedChat._id != msg.chat._id)
  //     ) {
  //       console.log("setnotification")
  //       setNotifications(notifications.set(msg.chat._id,[msg._id]))
  //       // setFetchAgain(!fetchAgain)
  //     }
  //     else {
  //       if(notifications.has(selectedChat._id)){
  //         console.log("deletenotification")
  //         notifications.delete(selectedChat._id)
  //       }else{
  //         console.log("setmessage")
  //       setmessages([...messages,msg]);
  //       setFetchAgain(!fetchAgain) 
  //     }
  //     }
  //   })
  // })
  // console.log(selectedChat)
  console.log(notifications)
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
