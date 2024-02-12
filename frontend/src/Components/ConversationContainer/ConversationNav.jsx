import React from 'react'
import {  Avatar, Button } from 'flowbite-react';
import { HiEllipsisVertical } from "react-icons/hi2";
import { ChatState } from '../../Context/ChatProvider.jsx';
import { getOppUserName } from '../../utils/ChatLogics.js';
import { UserState } from '../../Context/UserProvider.jsx'

const ConversationNav = () => {
  const {selectedChat} = ChatState();
  const {loggedUser}=UserState();
  // console.log(selectedChat)
  return (
    <div>
        <div className='w-full h-[5vw] flex border-b-[1px] border-black justify-between items-center p-[2vw]'>
          {selectedChat &&
        <div className='flex gap-4 items-center'><Avatar rounded size="md" />
        <h6 className='text-white'>{ !selectedChat.isGroupChat ?getOppUserName(loggedUser,selectedChat.users) :selectedChat.chatName}</h6>
        </div>}
        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button outline gradientDuoTone="purpleToBlue" className='text-3xl'>
            <HiEllipsisVertical className='text-[1.5vw]'></HiEllipsisVertical>
          </Button>
          
          
        </div>
      </div>
    </div>
  )
}

export default ConversationNav