import React from 'react'
import { Label, TextInput, Avatar, Button } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { HiOutlineUserGroup } from "react-icons/hi";
import Logout from '../Logout_btn';

const AddChatNav = () => {
  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[1vw]'>
        <Avatar rounded size="md" />
      
        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button outline gradientDuoTone="purpleToBlue" className='text-3xl'>

            <HiOutlineUserGroup className='text-xl'></HiOutlineUserGroup>
          </Button>
          <Logout></Logout>
          
        </div>
      </div>
      <div className='h-[5vw] w-full border-black border-b-[1px] border-t-[1px] flex justify-center items-center p-2'>
        <TextInput id="search" className='w-full' type="text" icon={HiSearch} placeholder="Add new conversation...." required />
      </div>
    </div>
  )
}

export default AddChatNav