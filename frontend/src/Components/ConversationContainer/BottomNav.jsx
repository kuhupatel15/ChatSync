import React from 'react'
import { TextInput, Button } from 'flowbite-react'
import { HiOutlinePaperClip } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { ChatState } from '../../Context/ChatProvider'
import { Send_message } from '../../utils/Fetch_data'
import { useParams } from 'react-router-dom';

const BottomNav = () => {
  const { selectedChat } = ChatState();
  const {chatid} = useParams();

  const sendmessage = async (e) => {

    const response = await Send_message({content: e.target.message.value, chatId:chatid })
    console.log(response.data)
  }

  return (
    <div className='flex items-center gap-2 p-2'>

      <HiOutlinePaperClip className='text-2xl '></HiOutlinePaperClip>

      <form onSubmit={(e) => {e.preventDefault();sendmessage(e)} } className='flex'>
        <TextInput id="message" name='message' className='w-full' type="text" placeholder="Type a new message...." required />=
        <button type='submit'>
          <IoIosSend className='text-2xl'></IoIosSend>
        </button>
      </form>
    </div>
  )
}

export default BottomNav