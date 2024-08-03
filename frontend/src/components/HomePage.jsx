import { useEffect } from 'react'
import ChatWindow from './chat-window/ChatWindow.jsx'
import DefaulChatBox from './DefaultChatBox.jsx'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const selectedChat = useSelector(({ selectedchat }) => selectedchat)


  return (
    <div className='hidden md:block'>
      {selectedChat ? <ChatWindow /> : <DefaulChatBox />}
    </div>
  )
}

export default HomePage;