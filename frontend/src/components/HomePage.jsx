import { useEffect } from 'react'
import ChatWindow from './chat-window/ChatWindow.jsx'
import DefaulChatBox from './DefaultChatBox.jsx'
import { useSelector } from 'react-redux'

const HomePage = () => {

  return (
    <div className='hidden md:block'>
      <DefaulChatBox />
    </div>
  )
}

export default HomePage;