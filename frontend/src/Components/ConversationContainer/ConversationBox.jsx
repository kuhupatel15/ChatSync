import Message from './Message'
import GroupChatMessage from './GroupChatMessage'
import { ChatState } from '../../Context/ChatProvider'
import { Get_all_messages } from '../../utils/Fetch_data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { ChatState } from '../../Context/ChatProvider'}
const ConversationBox = () => {
  const { selectedChat,fetchAgain,setFetchAgain } = ChatState();
  // const {fetchAgain,setFetchAgain}=ChatState()
  console.log(selectedChat)
  const [messages, setmessages] = useState([])
  const {chatid} = useParams();
  // const [chatId,setchatId]=useState(null);
  const i=0;
  console.log(chatid)
  const getmessages = async () => {
    const response = await Get_all_messages({ chatId: chatid })
    setmessages(response.data)
    
  }

  useEffect(() => {
    getmessages();
  },[selectedChat,fetchAgain])
  
  return (
    <div className='h-[41vw] p-2 overflow-scroll scrollbar-hide'>
      {messages && messages.map((message) => (
        <Message content={message.content}></Message>
      ))}
    </div>
  )
}

export default ConversationBox