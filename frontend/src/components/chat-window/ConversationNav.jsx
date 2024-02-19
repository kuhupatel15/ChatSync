import React from 'react'
import { Avatar, Button, Divider } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";
import { ChatState } from '../../context/ChatProvider.jsx';
import { getOppUserName } from '../../utils/ChatLogics.js';
import { UserState } from '../../context/UserProvider.jsx'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ConversationNav = () => {
  const { chatid } = useParams();
  const { selectedChat } = ChatState();
  const { loggedUser } = UserState();

  console.log(selectedChat)

  return (
    <div>
      <div className='w-full h-[5vw] flex justify-between items-center p-[2vw]'>
        {selectedChat &&
          <div className='flex gap-4 items-center'>
            <Avatar src={selectedChat.grpProfileimg} size="md" />
            <Link to={`/profile/${chatid}`} className='text-white'>{!selectedChat.isGroupChat ? getOppUserName(loggedUser, selectedChat.users) : selectedChat.chatName}
            </Link>
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