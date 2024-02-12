import React from 'react'
import { TextInput, Button } from 'flowbite-react'
import { HiOutlinePaperClip } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { ChatState } from '../../context/ChatProvider.jsx'
import { Send_message } from '../../utils/FetchData.js'
import { useParams } from 'react-router-dom';

const BottomNav = () => {
  const { selectedChat, setmessages, messages, setFetchAgain, fetchAgain, passsocket } = ChatState();
  const { chatid } = useParams();

  const sendmessage = async (e) => {
    const response = await Send_message({ content: e.target.message.value, chatId: chatid })
    if (response.data) { passsocket && passsocket.emit('new-message', response.data) }
    setFetchAgain(!fetchAgain);
  }

  return (
    <div className='flex items-center gap-2 p-2'>
      <HiOutlinePaperClip className='text-2xl' />
      <form onSubmit={(e) => {
        e.preventDefault();
        sendmessage(e)
      }}
        className='flex w-full'>
        <TextInput id="message" name='message' className='w-full' type="text" placeholder="Type a new message...." required />
        <button type='submit'>
          <IoIosSend className='text-2xl' />
        </button>
      </form>
    </div>
  )
}

export default BottomNav