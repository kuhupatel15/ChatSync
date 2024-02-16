import React from 'react'
import { Avatar, Button, Divider } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";
import { ChatState } from '../../context/ChatProvider.jsx';
import { getOppUserName } from '../../utils/ChatLogics.js';
import { UserState } from '../../context/UserProvider.jsx'


const ConversationNav = () => {
  const { selectedChat } = ChatState();
  const { loggedUser } = UserState();

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[2vw]'>
        {selectedChat &&
          <div className='flex gap-4 items-center'>
            <Avatar src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" size="md" />
            <h6 className='text-white'>{!selectedChat.isGroupChat ? getOppUserName(loggedUser, selectedChat.users) : selectedChat.chatName}
            </h6>
          </div>
        }
        <div className='flex gap-4 text-3xl text-[#8E9297]'>
          <Button isIconOnly className='mt-2 bg-gradient-to-br from-purple-500  to-cyan-500' variant="faded" aria-label="Take a photo">
            <CiMenuKebab className='text-xl' />
          </Button>
        </div>
      </div>
      {/* <Divider /> */}
    </div>
  )
}

export default ConversationNav