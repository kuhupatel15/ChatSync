import IncomingMessage from './IncomingMsg.jsx'
import GroupChatMessage from './GroupChatMessage.jsx'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Get_all_messages, Read_Message } from '../../utils/FetchData.js'
import { useEffect, useState } from 'react'
import { getTime, compareTime, getMsgTime } from '../../utils/msg.js'
import {Chip} from "@nextui-org/react";

import OutgoingMsg from './OutgoingMsg.jsx'
import { isSendByUser } from '../../utils/msg.js'
import { UserState } from '../../context/UserProvider.jsx'

const ConversationBox = ({ selectedChat }) => {
  const [selectedChatCompare, setselectedChatCompare] = useState();
  const { loggedUser } = UserState();
  const { notifications, setNotifications, setSelectedChat, fetchAgain, setFetchAgain, passsocket, messages, setmessages } = ChatState();


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
  const setReadBy = async (msgid) => {
    const response = await Read_Message({ msgId: msgid, userId: loggedUser._id })
    console.log(response)
  }
  useEffect(() => {
    getmessages();
    setselectedChatCompare(selectedChat)
  }, [selectedChat, fetchAgain])


  useEffect(() => {
    console.log('msg')
    passsocket && passsocket.on("message-recieved", (msg) => {
      console.log(msg)
      if (
        !selectedChat || (selectedChat._id != msg.chat._id)
      ) {
        console.log("setnotification")
        // setNotifications(notifications.set(msg.chat._id,[msg._id]))
        // setFetchAgain(!fetchAgain)
      }
      else {
        // if(notifications.has(selectedChat._id)){
        //   console.log("deletenotification")
        //   notifications.delete(selectedChat._id)
        // }else{
        console.log("setmessage")
        setReadBy(msg._id)
        setmessages([...messages, msg]);

        setFetchAgain(!fetchAgain)
        // }
      }
    })
  })

  // console.log(selectedChatCompare)
  // useEffect(() => {
  //   passsocket && passsocket.on("message-recieved", (msg) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== msg.chat._id
  //     ) {
  //       setNotifications(notifications.set(msg.chat._id,[msg._id]))
  //       // setFetchAgain(!fetchAgain)
  //     }
  //     else {
  //       // if(notifications.has(selectedChatCompare._id)){
  //       //   notifications.delete(selectedChatCompare._id)
  //       // }else{
  //       setmessages([...messages,msg]);
  //       setFetchAgain(!fetchAgain) }
  //     // }

  //   })
  // })
  // console.log(notifications)
  return (
    <div className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col border-t-[1px] border-black'>
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