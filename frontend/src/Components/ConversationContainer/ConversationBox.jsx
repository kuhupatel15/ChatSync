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
  var selectedChatCompare;
  const { selectedChat,setSelectedChat ,fetchAgain, setFetchAgain,passsocket} = ChatState();
  // console.log(selectedChat)
  const {loggedUser} =UserState();
  const [messages, setmessages] = useState([])
  const { chatid } = useParams();
  // const [chatId,setchatId]=useState(null);
  const i = 0;
  // useEffect(()=>{
  //   socket=io(Endpoint);
  //   // setSocket(socketCopy)
  //   socket.emit('setup',loggedUser._id)
  //   console.log(socket)
  // },[])
  const getmessages = async () => {
    if (!selectedChat) return;
    const response = await Get_all_messages({ chatId: chatid })
    setmessages(response.data)
    console.log('getmessages')
    passsocket.emit('join-room', selectedChat._id,(ack) => {
      if (ack === 'success') {
          console.log('Socket emit join successful');
      } else {
          console.log('Socket emit join failed');
      }
  })
    console.log(passsocket,selectedChat._id)
  }


  useEffect(() => {
    getmessages();
    selectedChatCompare=selectedChat;
  }, [selectedChat , fetchAgain])
  // console.log(passsocket)

  useEffect(()=>{
    passsocket&&passsocket.on("message-recieved",(msg)=>{
      console.log(".....")
      if(
        !selectedChatCompare||
        selectedChatCompare._id !== msg.chat._id
        ) { 
          //notif
        }
      else{
        setmessages([...messages,msg])
      }
    })
  })
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