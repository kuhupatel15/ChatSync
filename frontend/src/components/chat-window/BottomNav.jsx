import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setmessages } from '../../../store/reducers/messagesSlice.js';
import { Send_message } from '../../routes/MessagesRoutes.js'

const BottomNav = () => {

  const dispatch = useDispatch();
  const selectedChat = useSelector(({ selectedchat }) => selectedchat.chat)
  const messages = useSelector(({ messages }) => messages.messages)
  const socket = useSelector((state)=> state.socket.socket)


  const [message, setMessage] = useState('');

  const enterKeyHandler= (e)=>{
    if(e.keyCode===13){
      sendmessage();
    }
  }

  const sendmessage = async () => {
    if(message.length>0){const response = await Send_message({ content: message, chatId: selectedChat._id });
    console.log("SEND MESSAGE --> ",response.data)
    if (response.data) {
      socket && socket.emit('new-message', response.data);
      dispatch(setmessages([...messages, response.data]))
    }
    setMessage('');}
  }

  return (
    <div>
      <div className='flex items-center gap-2 p-2 '>
        <Input
          isRequired
          size='sm'
          // value={message}
          name='message'
          className='w-full '
          value={message}
          type="text"
          placeholder="Type a new message...."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e)=>enterKeyHandler(e)}
          endContent={
            <Button className="w-max  bg-gradient-to-br from-purple-500  to-cyan-500" onClick={sendmessage} >
              <IoIosSend className='text-xl' />
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default BottomNav;
