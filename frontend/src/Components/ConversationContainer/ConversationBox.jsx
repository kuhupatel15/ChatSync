import Message from './Message'
import GroupChatMessage from './GroupChatMessage'
import { ChatState } from '../../Context/ChatProvider'
import { Get_all_messages } from '../../utils/Fetch_data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OutgoingMsg from './OutgoingMsg'
import { isSendByUser } from '../../utils/msg'
import { UserState } from '../../Context/UserProvider.jsx'

// import { ChatState } from '../../Context/ChatProvider'}
const ConversationBox = () => {
  const { selectedChat,setSelectedChat ,fetchAgain, setFetchAgain } = ChatState();
  // console.log(selectedChat)
  const {loggedUser} =UserState();
  const [messages, setmessages] = useState([])
  const { chatid } = useParams();
  // const [chatId,setchatId]=useState(null);
  const i = 0;
  // console.log(chatid)
  const getmessages = async () => {
    const response = await Get_all_messages({ chatId: chatid })
    setmessages(response.data)

  }
  
  useEffect(() => {
    getmessages();
  }, [selectedChat, fetchAgain])
  console.log(messages)
  return (
    <div className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col'>
      {messages && messages.map((message) => (
        isSendByUser(loggedUser._id, message.sender) ?
          <Message
            content={message.content}
            time={message.createdAt}
          />
          : <OutgoingMsg
            content={message.content}
            time={message.createdAt}
          />

      ))}
    </div>
  )
}

export default ConversationBox