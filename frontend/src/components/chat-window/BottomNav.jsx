import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { ChatState } from '../../context/ChatProvider.jsx';
import { Send_message } from '../../utils/FetchData.js';
import { useParams } from 'react-router-dom';

const BottomNav = () => {

  const { selectedChat, setmessages, messages, setFetchAgain, socketConnected, setSocketConnected, fetchAgain, passsocket } = ChatState();
  const { chatid } = useParams();
  const [message, setMessage] = useState('');

  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  // console.log(socketConnected)
  // console.log(passsocket)

  useEffect(() => {
    if (passsocket) {
      passsocket.on("typing", () => setIsTyping(true));
      passsocket.on("stop typing", () => setIsTyping(false))
    }
  }, [])

  const sendmessage = async () => {
    passsocket.emit("stop typing", selectedChat._id);
    // setTyping(false);
    const response = await Send_message({ content: message, chatId: selectedChat });
    if (response.data) {
      passsocket && passsocket.emit('new-message', response.data);
      setMessage('');
      setmessages([...messages, response.data])
      setFetchAgain(!fetchAgain);
    }
  }
  // console.log(message)
  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      passsocket.emit("typing", selectedChat._id)
    }

    let lastTypingTime = new Date().getTime();
    // console.log(lastTypingTime)
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     passsocket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
    if(message.length === 0){
      // console.log("stop typing", message.length)
      passsocket.emit("stop typing", selectedChat._id);
      setTyping(false);
    }
  }

  return (
    <div>
      {istyping ? (
        <div>
          <span className='bg-yellow-500 text-xl'>Typing</span>
        </div>
      ) : (
        <></>
      )}
      <div className='flex items-center gap-2 p-2 '>
        <Input
          isRequired
          size='sm'
          value={message}
          onChange={typingHandler}
          name='message'
          className='w-full'
          type="text"
          placeholder="Type a new message...."
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
