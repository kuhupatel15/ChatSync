import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setmessages } from '../../../src/store/reducers/messagesSlice.js';
import { Send_message } from '../../routes/MessagesRoutes.js'

const BottomNav = () => {

  const dispatch = useDispatch();
  const selectedChat = useSelector(({ selectedchat }) => selectedchat.chat)
  const messages = useSelector(({ messages }) => messages.messages)
  const socket = useSelector((state)=> state.socket.socket)


  const [message, setMessage] = useState('');

  const sendmessage = async () => {
    const response = await Send_message({ content: message, chatId: selectedChat._id });
    console.log("SEND MESSAGE --> ",response.data)
    if (response.data) {
      socket && socket.emit('new-message', response.data);
      setMessage('');
      dispatch(setmessages([...messages, response.data]))
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
