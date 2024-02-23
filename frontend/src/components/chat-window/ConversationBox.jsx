import IncomingMessage from './IncomingMsg.jsx'
import GroupChatMessage from './GroupChatMessage.jsx'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Get_all_messages } from '../../utils/FetchData.js'
import { useEffect, useState } from 'react'

import OutgoingMsg from './OutgoingMsg.jsx'
import { isSendByUser } from '../../utils/msg.js'
import { UserState } from '../../context/UserProvider.jsx'

const ConversationBox = () => {
  var selectedChatCompare;
  
  
  
  const { loggedUser } = UserState();
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain, passsocket,messages, setmessages } = ChatState();
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
        
        setmessages([...messages,msg]);
      }
      
    })
  })

  return (
    <div className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col border-t-[1px] border-black'>
      {/* {selectedChat && selectedChat.isGroupChat ? */}
        {selectedChat && !selectedChat.isGroupChat&&messages && messages.map((message) => (
          isSendByUser(loggedUser._id, message.sender._id) ?
            <IncomingMessage
              content={message.content}
              time={message.createdAt}
            />
            : <OutgoingMsg
              content={message.content}
              time={message.createdAt}
            />
        ))}
      {selectedChat && selectedChat.isGroupChat&&messages && messages.map((message) => (
        <GroupChatMessage user={isSendByUser(loggedUser._id, message.sender._id)} msg={message.content} time={message.createdAt} profileImg={message.sender.profileImg}/>
          
      ))}
      {/* } */}
    </div>
  )
}

export default ConversationBox