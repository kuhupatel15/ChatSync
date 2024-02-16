import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { ChatState } from '../../context/ChatProvider.jsx';
import { Send_message } from '../../utils/FetchData.js';
import { useParams } from 'react-router-dom';

const BottomNav = () => {
  const { selectedChat, setmessages, messages, setFetchAgain, fetchAgain, passsocket } = ChatState();
  const { chatid } = useParams();
  const [message, setMessage] = useState('');

  const sendmessage = async () => {
    const response = await Send_message({ content: message, chatId: chatid });
    if (response.data) {
      passsocket && passsocket.emit('new-message', response.data);
      setFetchAgain(!fetchAgain);
      setMessage('');
    }
  }

  return (
    <div className='flex items-center gap-2 p-2 '>
      <Input
        isRequired
        size='sm'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name='message'
        className='w-full'
        type="text"
        placeholder="Type a new message...."
        endContent={
          <Button className="w-max  bg-gradient-to-br from-purple-500  to-cyan-500"  onClick={sendmessage}>
            <IoIosSend className='text-xl' />
          </Button>
        }
      />
    </div>
  )
}

export default BottomNav;
