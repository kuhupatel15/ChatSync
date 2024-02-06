import React from 'react'
import { TextInput, Button } from 'flowbite-react'
import { HiOutlinePaperClip } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";

const BottomNav = () => {
  return (
    <div className='flex items-center gap-2 p-2'>
        
        <HiOutlinePaperClip className='text-2xl '></HiOutlinePaperClip>
        
        <TextInput id="message" className='w-full' type="text"  placeholder="Type a new message...." required />
        <IoIosSend className='text-2xl'></IoIosSend>
    </div>
  )
}
 
export default BottomNav