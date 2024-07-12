import IncomingMessage from './IncomingMsg.jsx'
import GroupChatMessage from './GroupChatMessage.jsx'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Get_all_messages, Read_Message } from '../../utils/FetchData.js'
import { useEffect, useRef, useState } from 'react'
import { getTime, compareTime, getMsgTime } from '../../utils/msg.js'
import {Chip} from "@nextui-org/react";

import OutgoingMsg from './OutgoingMsg.jsx'
import { isSendByUser } from '../../utils/msg.js'
import { UserState } from '../../context/UserProvider.jsx'

const ConversationBox = ({ selectedChat }) => {
  const [selectedChatCompare, setselectedChatCompare] = useState();
  const { loggedUser } = UserState();
  const { notifications, setNotifications, setSelectedChat, fetchAgain, setFetchAgain, passsocket, messages, setmessages } = ChatState();
  const msgBox = useRef(null);

  useEffect(()=>{
    msgBox.current.scrollTo({ top: msgBox.current.scrollHeight})
  })

  const getmessages = async () => {
    if (!selectedChat) return;
    const response = await Get_all_messages({ chatId: selectedChat._id })
    setmessages(response.data)
    passsocket.emit('join-room', selectedChat._id)
  }

  const setReadBy = async (msgid) => {
    const response = await Read_Message({ msgId: msgid, userId: loggedUser._id })
    console.log(response)
  }
  
  useEffect(() => {
    // msgBox.current.scrollTo({ top: msgBox.current.scrollHeight, behavior: "smooth" })
    getmessages();
    setselectedChatCompare(selectedChat)

  }, [selectedChat, fetchAgain])
  
  return (
    <div ref={msgBox} className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col border-t-[1px] border-black'>
      {/* {selectedChat && selectedChat.isGroupChat ? */}
      {selectedChat && !selectedChat.isGroupChat && messages && messages.map((message,index) => (
               <>{compareTime(messages,index) && <Chip color="secondary" className='mx-auto my-2 p-2'>{compareTime(messages, index)} </Chip>}

        {isSendByUser(loggedUser._id, message.sender._id) ?
          <IncomingMessage
            content={message.content}
            time={message.createdAt}
          />
          : <OutgoingMsg
            content={message.content}
            time={message.createdAt}
          />}
          </>
      ))}
      {selectedChat && selectedChat.isGroupChat && messages && messages.map((message,index) => (
       <>{compareTime(messages,index) && <Chip color="secondary" className='mx-auto my-2 p-2'>{compareTime(messages, index)} </Chip>}
        {isSendByUser(loggedUser._id, message.sender._id) ?
          <GroupChatMessage user={isSendByUser(loggedUser._id, message.sender._id)} msg={message.content} time={message.createdAt} profileImg={message.sender.profileImg} sender={message.sender.userName} />
          : <OutgoingMsg content={message.content} time={message.createdAt}/>}
          </>
          )
          )

      }
      {/* } */}
    </div>
  )
}

export default ConversationBox