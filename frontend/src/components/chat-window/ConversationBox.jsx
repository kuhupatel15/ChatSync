import IncomingMessage from './IncomingMsg.jsx'
import GroupChatMessage from './GroupChatMessage.jsx'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Get_all_messages } from '../../utils/FetchData.js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OutgoingMsg from './OutgoingMsg.jsx'
import { isSendByUser } from '../../utils/msg.js'
import { UserState } from '../../context/UserProvider.jsx'

const ConversationBox = () => {
  var selectedChatCompare;

  const [messages, setmessages] = useState([])
  const { chatid } = useParams();

  const { loggedUser } = UserState();
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain, passsocket } = ChatState();
  const i = 0;

  // const [chatId,setchatId]=useState(null);
  // useEffect(()=>{
  //   socket=io(Endpoint);
  // setSocket(socketCopy)
  //   socket.emit('setup',loggedUser._id)
  //   console.log(socket)
  // },[])

  const getmessages = async () => {
    if (!selectedChat) return;
    const response = await Get_all_messages({ chatId: selectedChat._id })
    setmessages(response.data)
    passsocket.emit('join-room', selectedChat._id)
  }

  useEffect(() => {
    getmessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat, fetchAgain])

  useEffect(() => {
    passsocket && passsocket.on("message-recieved", (msg) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== msg.chat._id
      ) {
        console.log()
      }
      else {
        setmessages([...messages, msg])
      }
    })
  })

  return (
    <div className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col'>
      {messages && messages.map((message) => (
        isSendByUser(loggedUser._id, message.sender) ?
          <IncomingMessage
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