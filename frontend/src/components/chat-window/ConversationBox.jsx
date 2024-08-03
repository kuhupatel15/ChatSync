import IncomingMessage from './IncomingMsg.jsx'
import GroupChatMessage from './GroupChatMessage.jsx'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Get_all_messages, Read_Message } from '../../Routes/MessagesRoutes.js'
import { useEffect, useRef, useState } from 'react'
import { compareTime } from '../../utils/msg.js'
import { Chip } from "@nextui-org/react";
import OutgoingMsg from './OutgoingMsg.jsx'
import { isSendByUser } from '../../utils/msg.js'
import { useDispatch, useSelector } from 'react-redux'
import { setmessages } from '../../../store/reducers/messagesSlice.js'
import { setnotifications } from '../../../store/reducers/notificationsSlice.js'

const ConversationBox = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const user = useSelector(({auth}) => auth.userData)
  const messages = useSelector(({messages}) => messages.messages)
  const [selectedChatCompare, setselectedChatCompare] = useState();
  const { notifications } = ChatState();
  const socket = useSelector((state)=> state.socket.socket)

  const msgBox = useRef(null);

  useEffect(() => {
    msgBox.current.scrollTo({ top: msgBox.current.scrollHeight })
  })

  const getmessages = async () => {
    if (!selectedChat) return;
    const response = await Get_all_messages({ chatId: selectedChat._id })
    dispatch(setmessages(response.data))
    socket.emit('join-room', selectedChat._id)
  }

  const setReadBy = async (msgid) => {
    await Read_Message({ msgId: msgid, userId: user._id })
  }

  useEffect(() => {
    getmessages();
    setselectedChatCompare(selectedChat)
  }, [selectedChat])


  useEffect(() => {
    socket && socket.on("message-recieved", (msg) => {
      console.log("REcieved message --> ", msg)
      if (!selectedChat || (selectedChat._id !== msg.chat._id)) {
        if (notifications?.has(msg.chat._id)) {
          let pre = notifications.get(msg.chat._id)
          !pre.includes(msg) && dispatch(setnotifications(notifications.set(msg.chat._id, [...pre, msg])))
        }
        else {
          dispatch(setnotifications(notifications.set(msg.chat._id, [msg])))
        }
      }
      else {
        if (notifications.has(selectedChat._id)) {
          notifications.delete(selectedChat._id)
        }
        setReadBy(msg._id)
        dispatch(setmessages([...messages,msg]))
      }
    })
  })

  return (
    <div
      ref={msgBox}
      className='h-[41vw] px-4 py-2 overflow-scroll scrollbar-hide flex flex-col border-t-[1px] border-black'
    >
      {
        !selectedChat?.isGroupChat && messages?.map((message, index) => (
          <div key={message._id}>
            {
              compareTime(messages, index)
              &&
              <Chip color="secondary" className='mx-auto my-2 p-2'>{compareTime(messages, index)}</Chip>
            }

            {isSendByUser(user?._id, message.sender._id) ?
              <IncomingMessage
                content={message.content}
                time={message.createdAt}
              />
              :
              <OutgoingMsg
                content={message.content}
                time={message.createdAt}
              />
            }
          </div>
        ))
      }

      {
        selectedChat?.isGroupChat && messages?.map((message, index) => (
          <div key={message._id}>
            {
              compareTime(messages, index)
              &&
              <Chip color="secondary" className='mx-auto my-2 p-2'>{compareTime(messages, index)} </Chip>
            }

            {
              isSendByUser(user._id, message.sender._id) ?
                <GroupChatMessage
                  user={isSendByUser(user._id, message.sender._id)}
                  msg={message.content} time={message.createdAt}
                  profileImg={message.sender.profileImg}
                  sender={message.sender.userName}
                />
                :
                <OutgoingMsg content={message.content} time={message.createdAt} />
            }
          </div>
        ))
      }

    </div>
  )
}

export default ConversationBox