import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { ChatState } from '../../context/ChatProvider.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setmessages } from '../../../store/reducers/messagesSlice.js';
import { Send_message } from '../../Routes/MessagesRoutes.js'

const BottomNav = () => {

  const dispatch = useDispatch();
  const selectedChat = useSelector(({ selectedchat }) => selectedchat.chat)
  const messages = useSelector(({ messages }) => messages.messages)

  const { setFetchAgain, fetchAgain, passsocket } = ChatState();

  const [message, setMessage] = useState('');

  const sendmessage = async () => {
    const response = await Send_message({ content: message, chatId: selectedChat._id });
    if (response.data) {
      passsocket && passsocket.emit('new-message', response.data);
      setMessage('');
      dispatch(setmessages([...messages, response.data]))
      setFetchAgain(!fetchAgain);
    }
  }

  return (
    <div>
      <div className='flex items-center gap-2 p-2 '>
        <Input
          isRequired
          size='sm'
          // value={message}
          name='message'
          className='w-full'
          type="text"
          placeholder="Type a new message...."
          onChange={(e) => setMessage(e.target.value)}
          endContent={
            <Button className="w-max  bg-gradient-to-br from-purple-500  to-cyan-500" onClick={sendmessage}>
              <IoIosSend className='text-xl' />
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default BottomNav;
